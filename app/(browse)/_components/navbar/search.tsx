'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';
import React, { useState } from 'react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchTerm) return;

    const url = queryString.stringifyUrl(
      {
        url: '/search',
        query: { query: searchTerm },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-[300px] sm:max-w-[350px] relative"
    >
      <Input
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
        value={searchTerm}
        placeholder="Search"
        className="border-2 font-semibold border-zinc-700"
      />
      {searchTerm && (
        <div
          onClick={() => setSearchTerm('')}
          className="p-1 absolute right-10 cursor-pointer bg-zinc-900"
        >
          <X className="w-5 h-5" />
        </div>
      )}
      <Button
        size={'icon'}
        variant={'secondary'}
        className="bg-zinc-700 hover:bg-zinc-600 rounded-l-none px-1"
      >
        <SearchIcon className="w-5 h-5" />
      </Button>
    </form>
  );
};

export default Search;
