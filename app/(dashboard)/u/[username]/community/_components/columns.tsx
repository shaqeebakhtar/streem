'use client';

import ChannelAvatar from '@/components/channel-avatar';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import UnblockButton from './unblock-button';

export type BlockedChannel = {
  id: string;
  channelId: string;
  image: string | null;
  username: string | null;
  createdAt: string;
};

export const columns: ColumnDef<BlockedChannel>[] = [
  {
    accessorKey: 'username',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <ChannelAvatar
          username={row.original.username!}
          imageUrl={row.original.image!}
        />
        <p className="text-sm font-semibold">{row.original.username}</p>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date Blocked
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <UnblockButton channelId={row.original.channelId} />,
  },
];
