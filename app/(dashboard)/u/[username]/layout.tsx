import React from 'react';
import Navbar from './_components/navbar';
import Sidebar from './_components/sidebar';
import Container from './_components/container';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { notFound } from 'next/navigation';

type CreatorDashboardLayoutProps = {
  params: { username: string };
  children: React.ReactNode;
};

const CreatorDashboardLayout = async ({
  params,
  children,
}: CreatorDashboardLayoutProps) => {
  const session = await getServerSession(authOptions);

  if (session?.user.username !== params.username) {
    notFound();
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="flex relative top-[54px]">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorDashboardLayout;
