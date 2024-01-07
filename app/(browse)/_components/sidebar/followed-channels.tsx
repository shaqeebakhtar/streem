'use client';
import { Follow, type User as TChannel } from '@prisma/client';
import { useSidebar } from '@/store/use-sidebar';
import React from 'react';
import Channel from './channel';

type FollowedChannelsProps = {
  channels: (Follow & { following: TChannel })[];
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
      <div>
        {channels.map((channel) => {
          return (
            <Channel
              key={channel.following.id}
              username={channel.following.username!}
              imageUrl={channel.following.image || ''}
              isLive={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FollowedChannels;
