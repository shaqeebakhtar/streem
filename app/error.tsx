'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

const ErrorPage = () => {
  return (
    <div className="h-96 flex flex-col space-y-4 items-center justify-center text-zinc-500">
      <p>Something went wrong</p>
      <Button variant="secondary" asChild>
        <Link href="/">Go back to home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
