import { onUnblockChannel } from '@/app/(browse)/[username]/actions/block';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';

type UnblockButtonProps = {
  channelId: string;
};

const UnblockButton = ({ channelId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnblockChannel(channelId)
        .then((data) => toast.success(`Ublocked ${data.blocking.username}`))
        .catch(() => toast.error('Something went wrong'));
    });
  };

  return (
    <Button
      className="px-3 font-bold text-xs bg-zinc-700 hover:bg-zinc-600"
      size={'sm'}
      disabled={isPending}
      onClick={onClick}
    >
      Unblock
    </Button>
  );
};

export default UnblockButton;
