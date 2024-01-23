import db from '@/lib/db';
import { getCurrentUser } from './user';

export const findBlocked = async (channelId: string) => {
  try {
    const user = await getCurrentUser();

    const blocked = await db.block.findUnique({
      where: {
        blockerId_blockingId: {
          blockerId: user.id,
          blockingId: channelId,
        },
      },
    });

    return blocked;
  } catch (error) {
    return null;
  }
};

export const findIMBlocked = async (channelId: string) => {
  try {
    const user = await getCurrentUser();

    const blocked = await db.block.findUnique({
      where: {
        blockerId_blockingId: {
          blockerId: channelId,
          blockingId: user.id,
        },
      },
    });

    return blocked;
  } catch (error) {
    return null;
  }
};

export const blockChannel = async (channelId: string) => {
  const user = await getCurrentUser();

  const blocked = await db.block.create({
    data: {
      blockerId: user.id,
      blockingId: channelId,
    },
    include: {
      blocking: true,
    },
  });

  return blocked;
};

export const unblockChannel = async (channelId: string) => {
  const user = await getCurrentUser();

  const unblocked = await db.block.delete({
    where: {
      blockerId_blockingId: {
        blockerId: user.id,
        blockingId: channelId,
      },
    },
    include: {
      blocking: true,
    },
  });

  return unblocked;
};
