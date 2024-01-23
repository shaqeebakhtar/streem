import { findChannelByUsername } from '@/services/channel';
import { findFollowing } from '@/services/follow';
import { notFound } from 'next/navigation';
import React from 'react';
import Actions from './_components/actions';
import { findBlocked, findIMBlocked } from '@/services/block';
import StreamPlayer from '@/components/stream-player';

type ChannelUserNameProps = {
  params: {
    username: string;
  };
};

const ChannelUserName = async ({
  params: { username },
}: ChannelUserNameProps) => {
  const channel = await findChannelByUsername(username);

  if (!channel || !channel.stream) {
    notFound();
  }

  const isFollowing = !!(await findFollowing(channel.id));
  const isBlocked = !!(await findBlocked(channel.id));
  const isIMBlockedByChannel = !!(await findIMBlocked(channel.id));

  if (isIMBlockedByChannel) notFound();

  return (
    <StreamPlayer
      channel={channel}
      stream={channel.stream}
      isFollowing={isFollowing}
    />
  );
};

export default ChannelUserName;
