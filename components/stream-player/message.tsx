import { ReceivedChatMessage } from '@livekit/components-react';
import React from 'react';

type MessageProps = {
  data: ReceivedChatMessage;
};

const Message = ({ data }: MessageProps) => {
  return (
    <div className="flex items-start gap-2">
      <p className="font-semibold text-sm text-zinc-500">{data.from?.name}</p>
      <p className="text-sm">{data.message}</p>
    </div>
  );
};

export default Message;
