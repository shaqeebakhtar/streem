'use client';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTransition } from 'react';
import { onFollowChannel, onUnfollowChannel } from '../actions/follow';
import { onBlockChannel, onUnblockChannel } from '../actions/block';

type ActionsProps = {
  isFollowing: boolean;
  isBlocked: boolean;
  channelId: string;
};

const Actions = ({ isFollowing, isBlocked, channelId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollowChannel = () => {
    startTransition(() => {
      onFollowChannel(channelId);
    });
  };

  const handleUnfollowChannel = () => {
    startTransition(() => {
      onUnfollowChannel(channelId);
    });
  };

  const handleBlockChannel = () => {
    startTransition(() => {
      onBlockChannel(channelId);
    });
  };

  const handleUnblockChannel = () => {
    startTransition(() => {
      onUnblockChannel(channelId);
    });
  };

  return (
    <>
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
      <Button
        className={cn(
          'px-3 font-bold text-sm ml-3',
          isFollowing && 'bg-zinc-700 hover:bg-zinc-600'
        )}
        disabled={isPending}
        variant={'secondary'}
        onClick={isBlocked ? handleUnblockChannel : handleBlockChannel}
      >
        {isBlocked ? 'Unblock' : 'Block'}
      </Button>
    </>
  );
};

export default Actions;
