import ChannelAvatar from '@/components/channel-avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getCurrentUser } from '@/services/user';
import { LayoutDashboard, LogOut, Settings2, Tv } from 'lucide-react';
import Link from 'next/link';
import LogoutButton from './logout-button';

const ProfileMenu = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <ChannelAvatar
              imageUrl={user.image || ''}
              username={user.username}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 font-medium" align="end">
          <DropdownMenuLabel className="flex items-center space-x-2 py-3">
            <ChannelAvatar
              imageUrl={user.image || ''}
              username={user.username}
            />
            <div className="flex flex-col space-y-1 overflow-hidden">
              <p className="text-sm truncate">{user.username}</p>
              <p className="text-xs leading-none truncate">{user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={`/${user.username}`}>
              <DropdownMenuItem>
                <Tv className="w-4 h-4 mr-2" />
                Channel
              </DropdownMenuItem>
            </Link>
            <Link href={`/u/${user.username}`}>
              <DropdownMenuItem>
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Creator Dashboard
              </DropdownMenuItem>
            </Link>
            <Link href="/settings">
              <DropdownMenuItem>
                <Settings2 className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <LogoutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileMenu;
