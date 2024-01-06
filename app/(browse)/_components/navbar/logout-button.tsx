'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import React from 'react';

const LogoutButton = () => {
  return (
    <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/login' })}>
      <LogOut className="w-4 h-4 mr-2 rotate-180" />
      Log out
    </DropdownMenuItem>
  );
};

export default LogoutButton;
