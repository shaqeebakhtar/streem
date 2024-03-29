import db from '@/lib/db';
import { getCurrentUser } from './user';

export const getFollowedChannels = async () => {
  try {
    const user = await getCurrentUser();

    return await db.follow.findMany({
      where: {
        followerId: user.id,
        following: {
          blocking: {
            none: {
              blockingId: user.id,
            },
          },
        },
      },
      include: {
        following: {
          include: {
            stream: {
              select: {
                isLive: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    return [];
  }
};

export const followChannel = async (channelId: string) => {
  const currentUser = await getCurrentUser();

  const followed = await db.follow.create({
    data: {
      followerId: currentUser.id,
      followingId: channelId,
    },
    include: {
      following: true,
    },
  });

  return followed;
};

export const unfollowChannel = async (channelId: string) => {
  const currentUser = await getCurrentUser();

  const following = await db.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: currentUser.id,
        followingId: channelId,
      },
    },
  });

  let unfollowed = null;

  if (following) {
    unfollowed = await db.follow.delete({
      where: {
        id: following.id,
      },
      include: {
        following: true,
      },
    });
  }

  return unfollowed;
};

export const findFollowing = async (channelId: string) => {
  try {
    const currentUser = await getCurrentUser();

    const following = await db.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: channelId,
        },
      },
    });

    return following;
  } catch (error) {
    return null;
  }
};
