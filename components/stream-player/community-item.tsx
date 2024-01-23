import { onBlockChannel } from '@/app/(browse)/[username]/actions/block';
import { cn } from '@/lib/utils';
import React, { useTransition } from 'react';
import { toast } from 'sonner';
import Hint from '../hint';
import { MinusCircle } from 'lucide-react';
import { Button } from '../ui/button';

type CommunityItemProps = {
  hostName: string;
  viewerName: string;
  participantName: string;
  participantIdentity: string;
};

const CommunityItem = ({
  hostName,
  viewerName,
  participantIdentity,
  participantName,
}: CommunityItemProps) => {
  const [isBlocking, startTransition] = useTransition();
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;
    console.log('this');

    startTransition(() => {
      onBlockChannel(participantIdentity)
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch(() => toast.error('Something went wrong'));
    });
  };

  return (
    <div
      className={cn(
        'group flex items-center justify-between px-2 py-1 rounded hover:bg-zinc-800 h-11',
        isBlocking && 'opacity-50 pointer-events-none'
      )}
    >
      <p className="text-sm font-semibold">{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            disabled={isBlocking}
            onClick={handleBlock}
            variant={'secondary'}
            size={'icon'}
            className="opacity-0 group-hover:opacity-100 hover:bg-zinc-700"
          >
            <MinusCircle className="w-5 h-5" />
          </Button>
        </Hint>
      )}
    </div>
  );
};

export default CommunityItem;
