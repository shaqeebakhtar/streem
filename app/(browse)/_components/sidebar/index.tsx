import React from 'react';
import Wrapper from './wrapper';
import Toggle from './toggle';
import RecommendedChannels from './recommended-channels';
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
