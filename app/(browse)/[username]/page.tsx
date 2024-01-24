import StreamPlayer from '@/components/stream-player';
import { findBlocked, findIMBlocked } from '@/services/block';
import { findChannelByUsername } from '@/services/channel';
import { findFollowing } from '@/services/follow';
import { notFound } from 'next/navigation';

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
