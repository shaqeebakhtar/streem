import React from 'react';
import LiveBadge from './live-badge';
import Image from 'next/image';
import ChannelAvatar from './channel-avatar';
import { Skeleton } from './ui/skeleton';

type ThumbnailProps = {
  src: string | null;
  fallback: string;
  isLive: boolean;
  username: string;
};

const Thumbnail = ({ src, fallback, isLive, username }: ThumbnailProps) => {
  let content;

  if (!src) {
    content = (
      <div className="bg-zinc-800 h-full w-full grid place-items-center transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-sm">
        <ChannelAvatar
          size="lg"
          username={username}
          imageUrl={fallback}
          isLive={isLive}
        />
      </div>
    );
  } else {
    content = (
      <Image
        src={src}
        fill
        alt="Thumbnail"
        className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
      />
    );
  }

  return (
    <div className="group relative aspect-video rounded-sm cursor-pointer border">
      <div className="rounded-sm absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
      {content}
      {isLive && (
        <div className="absolute left-3 top-3 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

export default Thumbnail;

export const ThumbnailSkeleton = () => {
  return (
    <div className="group aspect-video relative rounded-sm cursor-pointer">
      <Skeleton className="h-full w-full bg-zinc-800" />
    </div>
  );
};
