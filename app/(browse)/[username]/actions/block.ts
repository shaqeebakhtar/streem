'use server';

import { blockChannel, unblockChannel } from '@/services/block';
import { revalidatePath } from 'next/cache';
import { onUnfollowChannel } from './follow';
import { RoomServiceClient } from 'livekit-server-sdk';
import { getCurrentUser } from '@/services/user';

const API_URL = process.env.LIVEKIT_API_URL as string;
const API_KEY = process.env.LIVEKIT_API_KEY as string;
const API_SECRET = process.env.LIVEKIT_API_SECRET as string;

const roomService = new RoomServiceClient(API_URL, API_KEY, API_SECRET);

export const onBlockChannel = async (channelId: string) => {
  const user = await getCurrentUser();

  let blockedChannel;
  try {
    blockedChannel = await blockChannel(channelId);
  } catch (error) {}

  try {
    await roomService.removeParticipant(user.id, channelId);
  } catch (error) {}

  // unfollow when blocked the channel
  if (blockedChannel) await onUnfollowChannel(channelId);

  revalidatePath(`/u/${user.username}/community`);

  if (blockedChannel) revalidatePath(`${blockedChannel.blocking.username}`);

  return blockedChannel;
};

export const onUnblockChannel = async (channelId: string) => {
  const unblockedChannel = await unblockChannel(channelId);

  revalidatePath('/');

  if (unblockedChannel) revalidatePath(`${unblockedChannel.blocking.username}`);

  return unblockedChannel;
};
