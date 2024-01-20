'use client';

import { useViewerToken } from '@/hooks/use-viewer-token';
import { LiveKitRoom } from '@livekit/components-react';
import { Stream, User } from '@prisma/client';
import VideoPlayer from './video-player';

type StreamPlayerProps = {
  stream: Stream;
  channel: User;
  isFollowing: boolean;
  isStreamOwner?: boolean;
};

const StreamPlayer = ({ channel }: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(channel.id);

  if (!token || !name || !identity) {
    return <div>Can&apos;t view Stream</div>;
  }

  const SERVER_URL = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  return (
    <div>
      <LiveKitRoom token={token} serverUrl={SERVER_URL}>
        <div>
          <div className="w-full">
            <VideoPlayer
              hostName={channel.username!}
              hostIdentity={channel.id}
            />
          </div>
        </div>
      </LiveKitRoom>
    </div>
  );
};

export default StreamPlayer;
