import db from '@/lib/db';
import { getCurrentUser } from './user';

export const getSearchResults = async (query?: string) => {
  let userId;

  try {
    const user = await getCurrentUser();
    userId = user.id;
  } catch (error) {
    userId = null;
  }

  let streams = [];

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockingId: userId,
              },
            },
          },
        },
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            user: {
              username: {
                contains: query,
              },
            },
          },
        ],
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
      },
      orderBy: [
        {
          isLive: 'desc',
        },
        {
          updatedAt: 'desc',
        },
      ],
    });
  } else {
    streams = await db.stream.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            user: {
              username: {
                contains: query,
              },
            },
          },
        ],
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
      },
      orderBy: [
        {
          isLive: 'desc',
        },
        {
          updatedAt: 'desc',
        },
      ],
    });
  }

  return streams;
};
