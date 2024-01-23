'use server';
import db from '@/lib/db';
import { getCurrentUser } from './user';
import { RedirectType, redirect } from 'next/navigation';

export const findUsername = async (input: string) => {
  const channel = await db.user.findUnique({
    where: {
      username: input,
    },
  });

  return channel;
};

export const createChannel = async (username: string) => {
  try {
    const user = await getCurrentUser();

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        username,
        channelName: username,
        stream: {
          create: {
            name: `${username}'s stream`,
          },
        },
      },
    });

    redirect('/', RedirectType.push);
  } catch (error) {
    throw error;
  }
};

export const findChannelByUsername = async (username: string) => {
  const channel = await db.user.findUnique({
    where: {
      username,
    },
    include: {
      stream: true,
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  return channel;
};

export const findChannelById = async (id: string) => {
  const channel = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      stream: true,
    },
  });

  return channel;
};
