'use client';
import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  MessageSquareText,
  Users,
} from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import Hint from '../hint';
import { cn } from '@/lib/utils';

const ChatVariantToggle = () => {
  const { variant, onVariantChange } = useChatSidebar((state) => state);

  const isChat = variant === ChatVariant.CHAT;

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onVariantChange(newVariant);
  };

  const Icon = isChat ? Users : MessageSquareText;

  const label = isChat ? 'Community' : 'Go back to chat';

  return (
    <div className="hidden lg:block">
      <Hint asChild label={label} side="right">
        <Button
          onClick={onToggle}
          variant={'ghost'}
          className="hover:bg-zinc-700"
          size={'icon'}
        >
          <Icon className="w-5 h-5" />
        </Button>
      </Hint>
    </div>
  );
};

export default ChatVariantToggle;
