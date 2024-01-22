import { cn } from '@/lib/utils';
import React from 'react';

interface LiveBadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

const LiveBadge = ({ className }: LiveBadgeProps) => {
  return (
    <div
      className={cn(
        className,
        'bg-red-600 text-center rounded-sm pt-1.5 pb-1 w-10'
      )}
    >
      <p className="text-xs font-semibold uppercase leading-none">Live</p>
    </div>
  );
};

export default LiveBadge;
