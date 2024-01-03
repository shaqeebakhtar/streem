import { Icons } from '@/components/icons';
import React from 'react';
import Search from './search';
import Actions from './actions';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-zinc-900 px-4 md:px-12 py-2">
      <div className="hidden sm:flex">
        <Icons.logo />
      </div>
      <Search />
      <Actions />
    </div>
  );
};

export default Navbar;
