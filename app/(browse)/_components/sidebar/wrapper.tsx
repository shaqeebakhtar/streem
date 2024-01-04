'use client';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import React from 'react';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { collapsed } = useSidebar((state) => state);

  return (
    <aside
      className={cn(
        'fixed left-0 z-50 h-full w-60 border-r-2 border-zinc-950 bg-zinc-800 space-y-4',
        collapsed && 'w-14'
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
