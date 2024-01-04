import ChannelAvatar from '@/components/channel-avatar';
import { Button } from '@/components/ui/button';
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
      <Link href={href} className="flex items-center space-x-2">
        <ChannelAvatar
          imageUrl={imageUrl}
          username={username}
          isLive={isLive}
          showLiveBadge={false}
        />
        {!collapsed && <p className="font-semibold">{username}</p>}
      </Link>
    </Button>
  );
};

export default Channel;
