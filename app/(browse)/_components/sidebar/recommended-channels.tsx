'use client';
import { User } from '@prisma/client';
import Channel from './channel';
import { useSidebar } from '@/store/use-sidebar';

type RecommendedChannelsProps = {
  channels: User[];
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
      <div>
        {channels.map((channel) => {
          return (
            <Channel
              key={channel.id}
              username={'shaqeebakhtar'}
              imageUrl={''}
              isLive={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedChannels;
