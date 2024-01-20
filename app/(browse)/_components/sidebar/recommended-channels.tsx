'use client';
import { useSidebar } from '@/store/use-sidebar';
import { type User as TChannel } from '@prisma/client';
import { Video } from 'lucide-react';
import Channel, { ChannelSkeleton } from './channel';

type RecommendedChannelsProps = {
  channels: (TChannel & { stream: { isLive: boolean } | null })[];
};

const RecommendedChannels = ({ channels }: RecommendedChannelsProps) => {
  const { collapsed } = useSidebar((state) => state);

  return (
    <div className="space-y-2">
      {!collapsed && channels.length > 0 && (
        <p className="p-2 uppercase font-semibold text-sm tracking-wide">
          Recommended Channels
        </p>
      )}
      {collapsed && channels.length > 0 && (
        <span className="inline-flex items-center px-4 w-full opacity-70">
          <Video className="w-5 h-5" />
        </span>
      )}
      <div>
        {channels.map((channel) => {
          return (
            <Channel
              key={channel.id}
              username={channel.username!}
              imageUrl={channel.image || ''}
              isLive={channel.stream?.isLive}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedChannels;

export const RecommendedChannelsSkeleton = () => {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <ChannelSkeleton key={i} />
      ))}
    </>
  );
};
