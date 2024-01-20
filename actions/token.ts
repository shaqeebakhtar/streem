'use server';

import { findIMBlocked } from '@/services/block';
import { findChannelById } from '@/services/channel';
import { getCurrentUser } from '@/services/user';
import { AccessToken } from 'livekit-server-sdk';
import { v4 } from 'uuid';

export const createViewerToken = async (hostIdentity: string) => {
  let user;

  try {
    user = await getCurrentUser();
  } catch (error) {
    const id = v4();
    const username = `guest#${Math.floor(Math.random() * 1000)}`;
    user = {
      id,
      username,
    };
  }

  const host = await findChannelById(hostIdentity);

  if (!host) {
    throw new Error('Channel not found');
  }

  const isBlocked = !!(await findIMBlocked(user.id));

  if (isBlocked) {
    throw new Error('User is blocked by channel');
  }

  const isHost = user.id === host.id;

  const API_KEY = process.env.LIVEKIT_API_KEY as string;
  const API_SECRET = process.env.LIVEKIT_API_SECRET as string;

  const token = new AccessToken(API_KEY, API_SECRET, {
    identity: isHost ? `host-${user.id}` : user.id,
    name: user.username,
  });

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
};
