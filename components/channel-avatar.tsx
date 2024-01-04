import { VariantProps, cva } from 'class-variance-authority';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import LiveBadge from './live-badge';

const avatarVariants = cva('', {
  variants: {
    size: {
      default: 'w-8 h-8',
      lg: 'w-14 h-14 text-xl',
    },
    defaultVariants: {
      size: 'default',
    },
  },
});

interface ChannelAvatarProps extends VariantProps<typeof avatarVariants> {
  imageUrl: string;
  username: string;
  isLive?: boolean;
  showLiveBadge?: boolean;
}

const ChannelAvatar = ({
  imageUrl,
  username,
  isLive,
  showLiveBadge,
  size,
}: ChannelAvatarProps) => {
  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && 'ring-2 ring-red-600',
          avatarVariants({ size })
        )}
      >
        <AvatarImage src={imageUrl} />
        <AvatarFallback className="font-semibold bg-zinc-600 uppercase">
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {isLive && showLiveBadge && (
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-3">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

export default ChannelAvatar;
