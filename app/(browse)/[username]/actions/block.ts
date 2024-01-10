'use server';

import { blockChannel, unblockChannel } from '@/services/block';
import { revalidatePath } from 'next/cache';
import { onUnfollowChannel } from './follow';

export const onBlockChannel = async (channelId: string) => {
  const blockedChannel = await blockChannel(channelId);

  // unfollow when blocked the channel
  if (blockedChannel) await onUnfollowChannel(channelId);

  revalidatePath('/');

  if (blockedChannel) revalidatePath(`${blockedChannel.blocking.username}`);

  return blockedChannel;
};

export const onUnblockChannel = async (channelId: string) => {
  const unblockedChannel = await unblockChannel(channelId);

  revalidatePath('/');

  if (unblockedChannel) revalidatePath(`${unblockedChannel.blocking.username}`);

  return unblockedChannel;
};
