'use client';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { followChannel, unfollowChannel } from '@/services/follow';
import { useTransition } from 'react';

type ActionsProps = {
  isFollowing: boolean;
  channelId: string;
};

const Actions = ({ isFollowing, channelId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollowChannel = () => {
    startTransition(() => {
      followChannel(channelId);
    });
  };

  const handleUnfollowChannel = () => {
    startTransition(() => {
      unfollowChannel(channelId);
    });
  };

  return (
    <Button
      className={cn(
        'px-3 font-bold text-sm',
        isFollowing && 'bg-zinc-700 hover:bg-zinc-600'
      )}
      disabled={isPending}
      onClick={isFollowing ? handleUnfollowChannel : handleFollowChannel}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
      {isPending && <Icons.spinner className="w-4 h-4 ml-2 animate-spin" />}
    </Button>
  );
};

export default Actions;
