import StreamPlayer from '@/components/stream-player';
import { authOptions } from '@/lib/auth-options';
import { findChannelByUsername } from '@/services/channel';
import { getServerSession } from 'next-auth';

type DashboardProps = {
  params: {
    username: string;
  };
};

const Dashboard = async ({ params }: DashboardProps) => {
  const channel = await findChannelByUsername(params.username);
  const session = await getServerSession(authOptions);

  if (
    !channel ||
    !session?.user ||
    !channel.stream ||
    channel.id !== session.user.id
  ) {
    throw new Error('Unauthorized');
  }

  return (
    <StreamPlayer
      channel={channel}
      stream={channel.stream}
      isFollowing={true}
      isStreamOwner={true}
    />
  );
};

export default Dashboard;
