import ChannelAvatar, {
  ChannelAvatarSkeleton,
} from '@/components/channel-avatar';
import Thumbnail, { ThumbnailSkeleton } from '@/components/thumbnail';
import { Skeleton } from '@/components/ui/skeleton';
import { User } from '@prisma/client';
import Link from 'next/link';

type StreamCardProps = {
  stream: {
    user: User;
    isLive: boolean;
    name: string;
    thumbnailUrl: string | null;
  };
};

const StreamCard = ({ stream }: StreamCardProps) => {
  return (
    <Link href={`/${stream.user.username}`}>
      <div className="h-full w-full space-y-3">
        <Thumbnail
          src={stream.thumbnailUrl}
          fallback={stream.user.image!}
          isLive={stream.isLive}
          username={stream.user.username!}
        />
        <div className="flex items-center space-x-2">
          <ChannelAvatar
            username={stream.user.username!}
            imageUrl={stream.user.image!}
          />
          <div className="space-y-0.5 overflow-hidden">
            <h4 className="font-semibold truncate hover:text-primary">
              {stream.name}
            </h4>
            <p className="text-xs text-zinc-400">{stream.user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StreamCard;

export const StreamCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-3">
      <ThumbnailSkeleton />
      <div className="flex items-center space-x-2">
        <ChannelAvatarSkeleton />
        <div className="space-y-0.5 overflow-hidden">
          <Skeleton className="h-4 w-32 bg-zinc-800" />
          <Skeleton className="h-3 w-24 bg-zinc-800" />
        </div>
      </div>
    </div>
  );
};
