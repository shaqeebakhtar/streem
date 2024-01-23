'use server';

import { authOptions } from '@/lib/auth-options';
import { User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const updateChannel = async (values: Partial<User>) => {
  const session = await getServerSession(authOptions);

  const validData = {
    bio: values.bio,
  };

  const channel = db.user.update({
    where: {
      id: session?.user.id,
    },
    data: {
      ...validData,
    },
  });

  revalidatePath(`/${session?.user.username}`);
  revalidatePath(`/u/${session?.user.username}`);

  return channel;
};
