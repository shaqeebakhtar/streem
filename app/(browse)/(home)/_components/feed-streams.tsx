import { getStreams } from '@/services/feed';
import StreamCard, { StreamCardSkeleton } from './stream-card';
import { Skeleton } from '@/components/ui/skeleton';

const FeedStreams = async () => {
  const streams = await getStreams();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">
        Live Channels we think you&apos;ll like
      </h3>
      <div className="w-full">
        {streams.length === 0 && (
          <div className="text-zinc-500 text-sm">
            No channels are live streaming.
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {streams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedStreams;

export const FeedStreamsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-72 mb-4 bg-zinc-800" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(4)].map((_, i) => (
          <StreamCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
