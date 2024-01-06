import React from 'react';

type ChannelUserNameProps = {
  params: {
    username: string;
  };
};

const ChannelUserName = ({ params: { username } }: ChannelUserNameProps) => {
  return <div>{username}</div>;
};

export default ChannelUserName;
