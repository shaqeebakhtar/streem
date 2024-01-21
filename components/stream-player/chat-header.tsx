import React from 'react';
import ChatToggle from './chat-toggle';
import { Skeleton } from '../ui/skeleton';
import ChatVariantToggle from './chat-variant-toggle';

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between p-2">
      <ChatToggle />
      <p className="uppercase font-semibold text-sm tracking-wide">
        Stream Chat
      </p>
      <ChatVariantToggle />
    </div>
  );
};

export default ChatHeader;

export const ChatHeaderSkeleton = () => {
  return (
    <div className="flex items-center justify-between p-2">
      <Skeleton className="w-8 h-8 border bg-zinc-800" />
      <Skeleton className="w-40 h-6 border bg-zinc-800" />
      <Skeleton className="w-8 h-8 border bg-zinc-800" />
    </div>
  );
};
