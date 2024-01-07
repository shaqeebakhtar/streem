'use server';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from './user';

export const followUser = async (id: string) => {
  const currentUser = await getCurrentUser();

  const followed = await db.follow.create({
    data: {
      followerId: currentUser.id,
      followingId: id,
    },
  });

  if (followed) revalidatePath('/');

  return followed;
};

export const unfollowUser = async (id: string) => {
  const currentUser = await getCurrentUser();

  const following = await db.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: currentUser.id,
        followingId: id,
      },
    },
  });

  if (!following) throw new Error(`You aren't following`);

  const unfollowed = await db.follow.delete({
    where: {
      id: following.id,
    },
  });

  if (unfollowed) revalidatePath('/');

  return unfollowed;
};

export const findFollowing = async (id: string) => {
  const currentUser = await getCurrentUser();

  const following = await db.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: currentUser.id,
        followingId: id,
      },
    },
  });

  return following;
};
