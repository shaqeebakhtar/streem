import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ChatInfo from './chat-info';

type ChatInputProps = {
  onChange: (value: string) => void;
  onSubmit: () => void;
  value: string;
  isHidden: boolean;
  isFollowing: boolean;
  isDelayed: boolean;
  isFollowersOnly: boolean;
};

const ChatInput = ({
  onChange,
  onSubmit,
  value,
  isHidden,
  isFollowersOnly,
  isFollowing,
  isDelayed,
}: ChatInputProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;

  const isDisabled = isHidden || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value) return;

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  return (
    <div className="p-2 space-y-2">
      {!isHidden && (
        <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
      )}
      {(!isHidden || !isDisabled) && (
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <Input
              value={value}
              onChange={(e) => onChange(e.currentTarget.value)}
              placeholder="Send a message"
              className="border-2 font-semibold border-zinc-700"
            />
            <Button type="submit">Chat</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChatInput;
