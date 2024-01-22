import { ReceivedChatMessage } from '@livekit/components-react';
import React from 'react';
import { Skeleton } from '../ui/skeleton';
import Message from './message';

type MessagesListProps = {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
};

const MessagesList = ({ isHidden, messages }: MessagesListProps) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="font-semibold text-zinc-500">
          {isHidden ? 'Chat is disabled' : 'Welcome to the chat!'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full gap-2">
      {messages.map((message) => (
        <Message key={message.timestamp} data={message} />
      ))}
    </div>
  );
};

export default MessagesList;

export const MessagesListSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="w-1/2 h-6 bg-zinc-800" />
    </div>
  );
};
