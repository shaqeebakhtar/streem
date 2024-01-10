import db from '@/lib/db';
import { getCurrentUser } from '@/services/user';

export const getRecommendedChannels = async () => {
  const user = await getCurrentUser();

  const channels = await db.user.findMany({
    where: {
      AND: [
        {
          NOT: {
            id: user.id,
          },
        },
        {
          NOT: {
            followers: {
              some: {
                followerId: user.id,
              },
            },
          },
        },
        {
          NOT: {
            blocker: {
              some: {
                blockerId: user.id,
              },
            },
          },
        },
        {
          NOT: {
            blocking: {
              some: {
                blockingId: user.id,
              },
            },
          },
        },
      ],
    },
  });

  return channels;
};
