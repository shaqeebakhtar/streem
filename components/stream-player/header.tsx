import React from 'react';
import ChannelAvatar from '../channel-avatar';
import {
  useParticipants,
  useRemoteParticipant,
} from '@livekit/components-react';
import { User } from 'lucide-react';
import Actions from './actions';
import { Skeleton } from '../ui/skeleton';

type HeaderProps = {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  imageUrl: string;
  isFollowing: boolean;
  name: string;
};

const Header = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  imageUrl,
  isFollowing,
  name,
}: HeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;
  const participantCount = participants.length - 1;

  const hostAsViewer = `host-${hostIdentity}`;

  const isHost = viewerIdentity === hostAsViewer;

  return (
    <div className="px-3 py-4 pb-8 flex flex-col gap-6 md:flex-row md:gap-0 items-start justify-between">
      <div className="flex items-center space-x-3">
        <ChannelAvatar
          imageUrl={imageUrl}
          username={hostName}
          size={'lg'}
          isLive={isLive}
          showLiveBadge={true}
        />
        <div className="space-y-0">
          <p className="font-semibold">{hostName}</p>
          <p className="font-medium">{name}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 justify-between w-full md:justify-normal md:w-auto">
        {isLive ? (
          <div className="text-destructive flex items-center gap-1">
            <User className="w-5 h-5" />
            <p className="text-sm">
              {participantCount} {participantCount === 1 ? 'Viewer' : 'Viewers'}
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white text-zinc-800 text-xs font-bold px-1.5 py-1 rounded-sm">
              <p>OFFLINE</p>
            </div>
          </>
        )}
        {!isHost && (
          <Actions isFollowing={isFollowing} hostIdentity={hostIdentity} />
        )}
      </div>
    </div>
  );
};

export default Header;

export const HeaderSkeleton = () => {
  return (
    <div className="px-3 py-4 pb-8 flex flex-col gap-6 md:flex-row md:gap-0 items-start justify-between">
      <div className="flex items-center space-x-3">
        <Skeleton className="rounded-full w-12 h-12 bg-zinc-800" />
        <div className="space-y-1">
          <Skeleton className="w-32 h-5 bg-zinc-800" />
          <Skeleton className="w-48 h-5 bg-zinc-800" />
        </div>
      </div>
      <div className="flex items-center space-x-4 justify-between w-full md:justify-normal md:w-auto">
        <Skeleton className="w-24 h-8 bg-zinc-800" />
        <Skeleton className="w-32 h-10 bg-zinc-800" />
      </div>
    </div>
  );
};
