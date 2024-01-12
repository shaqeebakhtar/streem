import React from 'react';
import Navbar from './_components/navbar';
import Sidebar from './_components/sidebar';
import Container from './_components/container';

type CreatorDashboardLayoutProps = {
  params: { username: string };
  children: React.ReactNode;
};

const CreatorDashboardLayout = ({
  params,
  children,
}: CreatorDashboardLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorDashboardLayout;
