'use server';
import { getCurrentUser } from '@/services/user';
import { Stream } from '@prisma/client';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const updateStream = async (values: Partial<Stream>) => {
  const user = await getCurrentUser();

  const stream = await db.stream.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!stream) throw new Error('Stream not found');

  const validData = {
    thumbnailUrl: values.thumbnailUrl,
    name: values.name,
    isChatEnabled: values.isChatEnabled,
    isChatFollowersOnly: values.isChatFollowersOnly,
    isChatDelayed: values.isChatDelayed,
  };

  const updatedStream = await db.stream.update({
    where: {
      id: stream.id,
    },
    data: {
      ...validData,
    },
  });

  revalidatePath(`/u/${user.username}/chat`);
  revalidatePath(`/u/${user.username}`);
  revalidatePath(`/${user.username}`);

  return updatedStream;
};
