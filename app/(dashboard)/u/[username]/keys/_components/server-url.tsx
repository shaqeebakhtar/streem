import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React from 'react';
import CopyButton from './copy-button';

interface ServerUrlProps extends React.HTMLAttributes<HTMLDivElement> {
  serverUrl: string | null;
}

const ServerUrl = ({ className, serverUrl }: ServerUrlProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-6 gap-3 items-start px-4 py-6 bg-zinc-900',
        className
      )}
    >
      <div className="col-span-2">
        <p className="text-sm font-bold">Server Url</p>
      </div>
      <div className="flex gap-1.5 col-span-4">
        <div className="w-full">
          <Input
            readOnly
            value={serverUrl || ''}
            placeholder="Server Url"
            className="border-2 tracking-wide border-zinc-500"
          />
        </div>
        <CopyButton value={serverUrl || ''} />
      </div>
    </div>
  );
};

export default ServerUrl;
