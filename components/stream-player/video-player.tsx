'use client';
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from '@livekit/components-react';
import { ConnectionState, Track } from 'livekit-client';
import { ReactNode } from 'react';
import Offline from './offline';
import VideoLoading from './video-loading';
import LiveVideo from './live-video';
import { Skeleton } from '../ui/skeleton';

type VideoPlayerProps = {
  hostName: string;
  hostIdentity: string;
};

const VideoPlayer = ({ hostName, hostIdentity }: VideoPlayerProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content: ReactNode;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <Offline username={hostName} />;
  } else if (!participant || tracks.length === 0) {
    content = <VideoLoading label={connectionState} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }

  return <div className="aspect-video">{content}</div>;
};

export default VideoPlayer;

export const VideoPlayerSkeleton = () => {
  return (
    <div className="aspect-video">
      <Skeleton className="w-full h-full bg-zinc-800" />
    </div>
  );
};
