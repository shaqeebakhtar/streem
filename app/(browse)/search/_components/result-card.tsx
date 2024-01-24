import Thumbnail, { ThumbnailSkeleton } from '@/components/thumbnail';
import { User } from '@prisma/client';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

type ResultCardProps = {
  data: {
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    updatedAt: Date;
    user: User;
  };
};

const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="w-full flex gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user.image!}
            isLive={data.isLive}
            username={data.user.username!}
          />
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-x-2">
            <p className="font-semibold text-lg cursor-pointer hover:text-primary">
              {data.user.username}
            </p>
          </div>
          <p className="text-sm text-zinc-500">{data.name}</p>
          <p className="text-sm text-zinc-500">
            {formatDistanceToNow(new Date(data.updatedAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ResultCard;

export const ResultCardSkeleton = () => {
  return (
    <div className="w-full flex gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-4 w-32 bg-zinc-800" />
        <Skeleton className="h-3 w-24 bg-zinc-800" />
        <Skeleton className="h-3 w-12 bg-zinc-800" />
      </div>
    </div>
  );
};
