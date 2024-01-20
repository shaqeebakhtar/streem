'use client';

import { useViewerToken } from '@/hooks/use-viewer-token';
import { LiveKitRoom } from '@livekit/components-react';
import { Stream, User } from '@prisma/client';

type StreamPlayerProps = {
  stream: Stream;
  channel: User;
  isFollowing: boolean;
  isOwner?: boolean;
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
        StreamPlayer
      </LiveKitRoom>
    </div>
  );
};

export default StreamPlayer;
