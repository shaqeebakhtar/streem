import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { LayoutDashboard, LogOut, Settings } from 'lucide-react';

type ProfileMenuProps = {};

const ProfileMenu = (props: ProfileMenuProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="font-semibold bg-zinc-700">
                {/* {getInitials(user?.email?.split('@')[0] as string)} */}
                SA
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 font-medium" align="end">
          <DropdownMenuLabel className="flex items-center space-x-2 py-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="font-semibold">
                {/* {getInitials(user?.email?.split('@')[0] as string)} */}
                SA
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm">
                {/* {user?.name} */}
                Shaqeeb Akhtar
              </p>
              <p className="text-xs leading-none">
                {/* {user?.email} */}
                shaqeeb@gmail.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Creator Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="w-4 h-4 mr-2 rotate-180" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileMenu;
