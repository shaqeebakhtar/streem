'use client';
import { useSidebar } from '@/store/use-sidebar';
import { Follow, type User as TChannel } from '@prisma/client';
import { UserCheck } from 'lucide-react';
import Channel from './channel';

type FollowedChannelsProps = {
  channels: (Follow & {
    following: TChannel & { stream: { isLive: boolean } | null };
  })[];
};

const FollowedChannels = ({ channels }: FollowedChannelsProps) => {
  const { collapsed } = useSidebar((state) => state);

  return (
    <div className="space-y-2">
      {!collapsed && channels.length > 0 && (
        <p className="p-2 uppercase font-semibold text-sm tracking-wide">
          Followed Channels
        </p>
      )}
      {collapsed && channels.length > 0 && (
        <span className="inline-flex items-center px-4 w-full opacity-70">
          <UserCheck className="w-5 h-5" />
        </span>
      )}
      <div>
        {channels.map((channel) => {
          return (
            <Channel
              key={channel.following.id}
              username={channel.following.username!}
              imageUrl={channel.following.image || ''}
              isLive={channel.following.stream?.isLive}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FollowedChannels;
