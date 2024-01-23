import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import FeedStreams, { FeedStreamsSkeleton } from './_components/feed-streams';
import { Suspense } from 'react';

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user && !session?.user.username) {
    redirect('/choose/username');
  }

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<FeedStreamsSkeleton />}>
        <FeedStreams />
      </Suspense>
    </div>
  );
};

export default Home;
