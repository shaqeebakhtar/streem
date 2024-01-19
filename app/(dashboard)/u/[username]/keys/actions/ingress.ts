'use server';

import db from '@/lib/db';
import { getCurrentUser } from '@/services/user';
import {
  CreateIngressOptions,
  IngressAudioEncodingPreset,
  IngressClient,
  IngressInput,
  IngressVideoEncodingPreset,
  RoomServiceClient,
} from 'livekit-server-sdk';
import { TrackSource } from 'livekit-server-sdk/dist/proto/livekit_models';
import { revalidatePath } from 'next/cache';

const API_URL = process.env.LIVEKIT_API_URL as string;
const API_KEY = process.env.LIVEKIT_API_KEY as string;
const API_SECRET = process.env.LIVEKIT_API_SECRET as string;

const ingressClient = new IngressClient(API_URL);

const roomService = new RoomServiceClient(API_URL, API_KEY, API_SECRET);

export const resetIngresses = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};

export const createIngress = async (ingressType: IngressInput) => {
  const user = await getCurrentUser();

  await resetIngresses(user.id);

  const options: CreateIngressOptions = {
    name: user.username,
    roomName: user.id,
    participantName: user.username,
    participantIdentity: user.id,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
    };
  }

  const ingress = await ingressClient.createIngress(ingressType, options);

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error('Failed to create ingress');
  }

  await db.stream.update({
    data: {
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
      ingressId: ingress.ingressId,
    },
    where: {
      userId: user.id,
    },
  });

  revalidatePath(`/u/${user.username}/keys`);

  return ingress;
};
