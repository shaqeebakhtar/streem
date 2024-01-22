import React, { useTransition } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import {
  onFollowChannel,
  onUnfollowChannel,
} from '@/app/(browse)/[username]/actions/follow';
import { toast } from 'sonner';
import { Icons } from '../icons';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type ActionsProps = {
  hostIdentity: string;
  isFollowing: boolean;
};

const Actions = ({ hostIdentity, isFollowing }: ActionsProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  const handleFollowChannel = () => {
    startTransition(() => {
      onFollowChannel(hostIdentity)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const handleUnfollowChannel = () => {
    startTransition(() => {
      onUnfollowChannel(hostIdentity)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const toggleFollow = () => {
    if (!session?.user.id) {
      return router.push('/register');
    }

    if (isFollowing) {
      handleUnfollowChannel();
    } else {
      handleFollowChannel();
    }
  };

  return (
    <Button
      className={cn(
        'px-3 font-bold text-sm',
        isFollowing && 'bg-zinc-700 hover:bg-zinc-600'
      )}
      disabled={isPending}
      onClick={toggleFollow}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
      {isPending && <Icons.spinner className="w-4 h-4 ml-2 animate-spin" />}
    </Button>
  );
};

export default Actions;
