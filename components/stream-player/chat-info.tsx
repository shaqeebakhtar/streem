import React, { useMemo } from 'react';
import Hint from '../hint';
import { Info } from 'lucide-react';

type ChatInfoProps = {
  isDelayed: boolean;
  isFollowersOnly: boolean;
};

const ChatInfo = ({ isDelayed, isFollowersOnly }: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return 'Only followers can send messages';
    }

    if (isDelayed && !isFollowersOnly) {
      return 'Messages are delayed by 3 seconds';
    }

    if (isDelayed && isFollowersOnly) {
      return 'Only followers can chat. Messages are delayed by 3 seconds';
    }

    return '';
  }, [isDelayed, isFollowersOnly]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return 'Followers-Only chat';
    }

    if (isDelayed && !isFollowersOnly) {
      return 'Slow mode';
    }

    if (isDelayed && isFollowersOnly) {
      return 'Followers-Only and Slow mode';
    }

    return '';
  }, [isDelayed, isFollowersOnly]);

  if (!isDelayed && !isFollowersOnly) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 bg-zinc-800 border p-2 rounded">
      <Hint label={hint}>
        <Info className="w-4 h-4" />
      </Hint>
      <p className="text-sm font-semibold text-zinc-300">{label}</p>
    </div>
  );
};

export default ChatInfo;
