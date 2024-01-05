import React from 'react';
import Wrapper from './wrapper';
import Toggle from './toggle';
import RecommendedChannels, {
  RecommendedChannelsSkeleton,
} from './recommended-channels';
import { getRecommendedChannels } from '@/data-access/get-recommended-channels';

const Sidebar = async () => {
  const channels = await getRecommendedChannels();

  return (
    <Wrapper>
      <Toggle />
      <RecommendedChannels channels={channels} />
    </Wrapper>
  );
};

export default Sidebar;

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 z-50 h-full w-14 md:w-60 border-r-2 border-zinc-950 bg-zinc-800 pt-4">
      <RecommendedChannelsSkeleton />
    </aside>
  );
};
