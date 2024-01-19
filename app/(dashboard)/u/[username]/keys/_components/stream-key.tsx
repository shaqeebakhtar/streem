'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import CopyButton from './copy-button';

interface StreamKeyProps extends React.HTMLAttributes<HTMLDivElement> {
  streamKey: string | null;
}

const StreamKey = ({ className, streamKey }: StreamKeyProps) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div
      className={cn(
        'grid grid-cols-6 gap-3 items-start px-4 py-6 bg-zinc-900',
        className
      )}
    >
      <div className="col-span-2">
        <p className="text-sm font-bold">Stream Key</p>
      </div>
      <div className="flex gap-1.5 col-span-4">
        <div className="w-full space-y-1">
          <Input
            readOnly
            value={streamKey || ''}
            type={isShown ? 'text' : 'password'}
            placeholder="Stream Key"
            className="border-2 tracking-wide border-zinc-500"
          />
          <Button
            variant={'link'}
            className="py-0 px-0 h-5"
            onClick={() => setIsShown(!isShown)}
          >
            {isShown ? 'Hide' : 'Show'}
          </Button>
        </div>
        <CopyButton value={streamKey || ''} />
      </div>
    </div>
  );
};

export default StreamKey;
