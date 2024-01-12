'use client';
import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

const Container = ({ children }: { children: React.ReactNode }) => {
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar(
    (state) => state
  );
  const matches = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div className={cn('flex-1', collapsed ? 'ml-14' : 'md:ml-60')}>
      {children}
    </div>
  );
};

export default Container;
