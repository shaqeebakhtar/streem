'use client';
import { useChatSidebar } from '@/store/use-chat-sidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import Hint from '../hint';
import { cn } from '@/lib/utils';

const ChatToggle = () => {
  const { collapsed, onCollapse, onExpand } = useChatSidebar((state) => state);
  const label = collapsed ? 'Expand' : 'Collapse';

  return (
    <div className="hidden lg:block">
      <Hint asChild label={label} side="right">
        <Button
          onClick={collapsed ? onExpand : onCollapse}
          variant={'ghost'}
          className={cn('hover:bg-zinc-700', collapsed && 'hover:bg-white/10')}
          size={'icon'}
        >
          {collapsed ? (
            <ArrowLeftFromLine className="w-5 h-5" />
          ) : (
            <ArrowRightFromLine className="w-5 h-5" />
          )}
        </Button>
      </Hint>
    </div>
  );
};

export default ChatToggle;
