'use server';

import { followChannel, unfollowChannel } from '@/services/follow';
import { revalidatePath } from 'next/cache';

export const onFollowChannel = async (channelId: string) => {
  const followedChannel = await followChannel(channelId);

  revalidatePath('/');

  if (followedChannel) revalidatePath(`${followedChannel.following.username}`);

  return followedChannel;
};

export const onUnfollowChannel = async (channelId: string) => {
  const unfollowedChannel = await unfollowChannel(channelId);

  revalidatePath('/');

  if (unfollowedChannel)
    revalidatePath(`${unfollowedChannel.following.username}`);

  return unfollowedChannel;
};
