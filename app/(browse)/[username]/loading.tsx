import { StreamPlayerSkeleton } from '@/components/stream-player';
import React from 'react';

const ChannelLoading = () => {
  return (
    <div className="h-full">
      <StreamPlayerSkeleton />
    </div>
  );
};

export default ChannelLoading;
