import { Button, buttonVariants } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import ProfileMenu from './profile-menu';
import { Inbox } from 'lucide-react';
import Hint from '@/components/hint';

const Actions = async () => {
  const session = await getServerSession();

  return (
    <>
      {!session?.user && (
        <div className="space-x-2">
          <Button
            asChild
            className="px-3 font-bold text-xs bg-zinc-700 hover:bg-zinc-600"
            size={'sm'}
            variant={'secondary'}
          >
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild className="px-3 font-bold text-xs" size={'sm'}>
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      )}
      {session?.user && (
        <div className="flex items-center space-x-4">
          <Hint asChild label={'Notifications'}>
            <Button
              size={'icon'}
              variant={'ghost'}
              className="hover:bg-zinc-700"
            >
              <Inbox className="w-4 h-4" />
            </Button>
          </Hint>
          <ProfileMenu />
        </div>
      )}
    </>
  );
};

export default Actions;
