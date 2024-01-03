'use client';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!session?.user) {
      router.push(`/login?redirect_url=${pathname}`);
    }
  }, [pathname, router, session?.user]);

  return <div>This is a protected page</div>;
};

export default Dashboard;
