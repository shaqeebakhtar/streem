'use client';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { followUser, unfollowUser } from '@/services/follow';
import { useTransition } from 'react';

type ActionsProps = {
  isFollowing: boolean;
  channelId: string;
};

const Actions = ({ isFollowing, channelId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollowUser = () => {
    startTransition(() => {
      followUser(channelId);
    });
  };

  const handleUnfollowUser = () => {
    startTransition(() => {
      unfollowUser(channelId);
    });
  };

  return (
    <Button
      className={cn(
        'px-3 font-bold text-sm',
        isFollowing && 'bg-zinc-700 hover:bg-zinc-600'
      )}
      disabled={isPending}
      onClick={isFollowing ? handleUnfollowUser : handleFollowUser}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
      {isPending && <Icons.spinner className="w-4 h-4 ml-2 animate-spin" />}
    </Button>
  );
};

export default Actions;
