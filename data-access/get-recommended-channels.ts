import db from '@/lib/db';

export const getRecommendedChannels = async () => {
  return await db.user.findMany();
};
