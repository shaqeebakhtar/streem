import ProfileMenu from '@/app/(browse)/_components/navbar/profile-menu';
import Hint from '@/components/hint';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Inbox } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-zinc-900 px-4 md:px-4 py-2 border-b-2 border-zinc-950">
      <Link href="/">
        <Icons.logoSm className="flex sm:hidden hover:scale-110 transition-transform" />
        <Icons.logo className="hidden sm:flex" />
      </Link>
      <div className="flex items-center space-x-4">
        <Hint asChild label={'Notifications'}>
          <Button size={'icon'} variant={'ghost'} className="hover:bg-zinc-700">
            <Inbox className="w-4 h-4" />
          </Button>
        </Hint>
        <ProfileMenu />
      </div>
    </div>
  );
};

export default Navbar;
