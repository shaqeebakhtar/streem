'use client';

import { useViewerToken } from '@/hooks/use-viewer-token';
import { cn } from '@/lib/utils';
import { useChatSidebar } from '@/store/use-chat-sidebar';
import { LiveKitRoom } from '@livekit/components-react';
import { Stream, User } from '@prisma/client';
import Chat, { ChatSkeleton } from './chat';
import ChatToggle from './chat-toggle';
import Header, { HeaderSkeleton } from './header';
import VideoPlayer, { VideoPlayerSkeleton } from './video-player';
import InfoCard from './info-card';
import AboutCard from './about-card';

type StreamPlayerProps = {
  stream: Stream;
  channel: User & {
    stream: Stream | null;
    _count: { followers: number };
  };
  isFollowing: boolean;
  isStreamOwner?: boolean;
};

const StreamPlayer = ({ channel, isFollowing, stream }: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(channel.id);
  const { collapsed } = useChatSidebar((state) => state);

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }

  const SERVER_URL = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  return (
    <div className="relative">
      {collapsed && (
        <div className="absolute right-2 top-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom token={token} serverUrl={SERVER_URL}>
        <div
          className={cn(
            'grid grid-cols-1 lg:grid-cols-3',
            collapsed && 'lg:grid-cols-2'
          )}
        >
          <div className="col-span-2">
            <VideoPlayer
              hostName={channel.username!}
              hostIdentity={channel.id}
            />
            <Header
              hostName={channel.username!}
              hostIdentity={channel.id}
              viewerIdentity={identity}
              imageUrl={channel.image!}
              isFollowing={isFollowing}
              name={stream.name}
            />
            <InfoCard
              hostIdentity={channel.id}
              viewerIdentity={identity}
              name={stream.name}
              thumbnailUrl={stream.thumbnailUrl}
            />
            <AboutCard
              hostName={channel.username!}
              hostIdentity={channel.id}
              viewerIdentity={identity}
              bio={channel.bio}
              followersCount={channel._count.followers}
            />
          </div>
          <div className={cn('col-span-1', collapsed && 'hidden')}>
            <Chat
              viewerName={name}
              hostName={channel.username!}
              hostIdentity={channel.id}
              isFollowing={isFollowing}
              isChatEnabled={stream.isChatEnabled}
              isChatDelayed={stream.isChatDelayed}
              isChatFollowersOnly={stream.isChatFollowersOnly}
            />
          </div>
        </div>
      </LiveKitRoom>
    </div>
  );
};

export default StreamPlayer;

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="col-span-2">
        <VideoPlayerSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1">
        <ChatSkeleton />
      </div>
    </div>
  );
};
