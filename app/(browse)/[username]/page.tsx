import { findChannelByUsername } from '@/services/channel';
import { findFollowing } from '@/services/follow';
import { notFound } from 'next/navigation';
import React from 'react';
import Actions from './_components/actions';
import { findBlocked, findIMBlocked } from '@/services/block';

type ChannelUserNameProps = {
  params: {
    username: string;
  };
};

const ChannelUserName = async ({
  params: { username },
}: ChannelUserNameProps) => {
  const channel = await findChannelByUsername(username);

  if (!channel) {
    notFound();
  }

  const isFollowing = !!(await findFollowing(channel.id));
  const isBlocked = !!(await findBlocked(channel.id));
  const isIMBlockedByChannel = !!(await findIMBlocked(channel.id));

  if (isIMBlockedByChannel) notFound();

  return (
    <div>
      <p>id: {channel.id}</p>
      <p>username: {channel.username}</p>
      <p>Channel Name: {channel.channelName}</p>
      <p>Is Blocked: {`${isIMBlockedByChannel}`}</p>
      <Actions
        isFollowing={isFollowing}
        isBlocked={isBlocked}
        channelId={channel.id}
      />
    </div>
  );
};

export default ChannelUserName;
