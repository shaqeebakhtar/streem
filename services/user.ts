'use server';

import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    throw new Error('Not Logged In');
  }

  return session.user;
};
