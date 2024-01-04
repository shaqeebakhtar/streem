import { Icons } from '@/components/icons';
import React from 'react';
import Search from './search';
import Actions from './actions';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-zinc-900 px-4 md:px-4 py-2 border-b-2 border-zinc-950">
      <Link href="/">
        <Icons.logoSm className="flex sm:hidden hover:scale-110 transition-transform" />
        <Icons.logo className="hidden sm:flex" />
      </Link>
      <Search />
      <Actions />
    </div>
  );
};

export default Navbar;
