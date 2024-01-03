import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import React from 'react';

const Actions = async () => {
  const session = await getServerSession();

  return (
    <>
      {!session?.user && (
        <div className="space-x-2">
          <Button
            className="px-3 font-bold text-xs bg-zinc-700 hover:bg-zinc-600"
            size={'sm'}
            variant={'secondary'}
          >
            Log In
          </Button>
          <Button className="px-3 font-bold text-xs" size={'sm'}>
            Sign Up
          </Button>
        </div>
      )}
      {!!session?.user && <div></div>}
    </>
  );
};

export default Actions;
