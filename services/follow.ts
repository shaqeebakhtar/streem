import db from '@/lib/db';
import { getCurrentUser } from './user';

export const getFollowedChannels = async () => {
  try {
    const user = await getCurrentUser();

    return await db.follow.findMany({
      where: {
        followerId: user.id,
      },
      include: {
        following: true,
      },
    });
  } catch (error) {
    return [];
  }
};

export const followChannel = async (id: string) => {
  const currentUser = await getCurrentUser();

  const followed = await db.follow.create({
    data: {
      followerId: currentUser.id,
      followingId: id,
    },
    include: {
      following: true,
    },
  });

  return followed;
};

export const unfollowChannel = async (id: string) => {
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
    include: {
      following: true,
    },
  });

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
