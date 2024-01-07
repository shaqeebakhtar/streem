import React from 'react';
import Wrapper from './wrapper';
import Toggle from './toggle';
import RecommendedChannels, {
  RecommendedChannelsSkeleton,
} from './recommended-channels';
import FollowedChannels from './followed-channels';
import { getRecommendedChannels } from '@/services/recommendation';
import { getFollowedChannels } from '@/services/follow';

const Sidebar = async () => {
  const recommendedchannels = await getRecommendedChannels();
  const followedChannels = await getFollowedChannels();

  return (
    <Wrapper>
      <Toggle />
      <FollowedChannels channels={followedChannels} />
      <RecommendedChannels channels={recommendedchannels} />
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
