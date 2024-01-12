'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type NavigationItemProps = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const NavigationItem = ({ label, href, icon: Icon }: NavigationItemProps) => {
  const pathname = usePathname();
  const { collapsed } = useCreatorSidebar((state) => state);

  const isActive = pathname === href;

  return (
    <Button
      variant={'ghost'}
      className={cn(
        'py-3 px-4 h-auto w-full hover:bg-zinc-700/30 opacity-70 hover:opacity-100',
        isActive && 'bg-zinc-700/30 opacity-100'
      )}
      asChild
    >
      <Link href={href} className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <Icon className="w-5 h-5" />
          {!collapsed && <p className="font-semibold truncate">{label}</p>}
        </div>
      </Link>
    </Button>
  );
};

export default NavigationItem;
