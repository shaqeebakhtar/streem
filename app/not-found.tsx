import Link from 'next/link';

import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="h-96 flex flex-col space-y-4 items-center justify-center text-zinc-500">
      <div className="space-y-1 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p>We couldn&apos;t find the page you were looking for.</p>
      </div>
      <Button variant="secondary" asChild>
        <Link href="/">Go back to home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
