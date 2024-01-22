import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import React, { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import ChatHeader, { ChatHeaderSkeleton } from './chat-header';
import ChatInput, { ChatInputSkeleton } from './chat-input';
import MessagesList, { MessagesListSkeleton } from './messages-list';
import ChatCommunity from './chat-community';

type ChatProps = {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
};

const Chat = ({
  viewerName,
  hostIdentity,
  hostName,
  isChatDelayed,
  isChatEnabled,
  isChatFollowersOnly,
  isFollowing,
}: ChatProps) => {
  const matches = useMediaQuery('(max-width: 1024px)');
  const { variant, onExpand } = useChatSidebar((state) => state);

  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState('');
  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matches) {
      onExpand;
    }
  }, [matches, onExpand]);

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue('');
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="bg-zinc-900 h-[calc(100vh-54px)] flex flex-col pb-3">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <MessagesList messages={reversedMessages} isHidden={isHidden} />
          <ChatInput
            onChange={onChange}
            onSubmit={onSubmit}
            isHidden={isHidden}
            value={value}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
            isFollowersOnly={isChatFollowersOnly}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <>
          <ChatCommunity
            viewerName={viewerName}
            hostName={hostName}
            isHidden={isHidden}
          />
        </>
      )}
    </div>
  );
};

export default Chat;

export const ChatSkeleton = () => {
  return (
    <div className="bg-zinc-900 h-[calc(100vh-54px)] flex flex-col pb-3">
      <ChatHeaderSkeleton />
      <MessagesListSkeleton />
      <ChatInputSkeleton />
    </div>
  );
};
