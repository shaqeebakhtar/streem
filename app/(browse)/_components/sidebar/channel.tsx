import ChannelAvatar from '@/components/channel-avatar';
import LiveBadge from '@/components/live-badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ChannelProps = {
  username: string;
  imageUrl: string;
  isLive?: boolean;
};

const Channel = ({ username, imageUrl, isLive }: ChannelProps) => {
  const pathname = usePathname();
  const { collapsed } = useSidebar((state) => state);

  const href = `/${username}`;
  const isActive = pathname === href;

  return (
    <Button
      variant={'ghost'}
      className={cn(
        'py-1.5 px-2 h-auto w-full hover:bg-zinc-700/30 ',
        !collapsed && 'justify-start',
        isActive && 'bg-zinc-700/30'
      )}
      asChild
    >
      <Link href={href} className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ChannelAvatar
            imageUrl={imageUrl}
            username={username}
            isLive={false}
            showLiveBadge={false}
          />
          {!collapsed && <p className="font-semibold truncate">{username}</p>}
        </div>
        {!collapsed && isLive && <LiveBadge />}
      </Link>
    </Button>
  );
};

export default Channel;

export const ChannelSkeleton = () => {
  return (
    <div className="flex items-center space-x-2 py-1.5 px-2 h-auto w-full">
      <Skeleton className="rounded-full w-10 h-10 bg-zinc-600" />
      <div className="flex-1 hidden md:block">
        <Skeleton className="h-5 bg-zinc-600" />
      </div>
    </div>
  );
};
