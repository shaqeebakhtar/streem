'use server';
import db from '@/lib/db';
import { getCurrentUser } from './user';
import { RedirectType, redirect } from 'next/navigation';

export const findUsername = async (input: string) => {
  const channel = await db.channel.findUnique({
    where: {
      username: input,
    },
  });

  return channel;
};

export const createChannel = async (username: string) => {
  try {
    const user = await getCurrentUser();

    await db.channel.update({
      where: {
        id: user.id,
      },
      data: {
        username,
        channelName: username,
      },
    });

    redirect('/', RedirectType.push);
  } catch (error) {
    throw error;
  }
};

export const findChannelByUsername = async (username: string) => {
  const channel = await db.channel.findUnique({
    where: {
      username,
    },
  });

  return channel;
};
