import db from '@/lib/db';
import { getCurrentUser } from '@/services/user';

export const getRecommendedChannels = async () => {
  let userId;

  try {
    const user = await getCurrentUser();
    userId = user.id;
  } catch (error) {
    userId = null;
  }

  let channels;
  if (userId) {
    channels = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followers: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocker: {
                some: {
                  blockerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockingId: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } else {
    channels = await db.user.findMany({
      include: {
        stream: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  return channels;
};
