import { useParticipants } from '@livekit/components-react';
import { useMemo, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import CommunityItem from './community-item';
import { LocalParticipant, RemoteParticipant } from 'livekit-client';

type ChatCommunityProps = {
  viewerName: string;
  hostName: string;
  isHidden: boolean;
};

const ChatCommunity = ({
  viewerName,
  hostName,
  isHidden,
}: ChatCommunityProps) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce<string>(value, 500);
  const participants = useParticipants();

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;

      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }

      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter((participant) => {
      return participant.name
        ?.toLowerCase()
        .includes(debouncedValue.toLowerCase());
    });
  }, [participants, debouncedValue]);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="font-semibold text-zinc-500">Community is disabled</p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-6">
      <Input
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder="Search community"
        className="border-2 font-semibold border-zinc-700"
      />
      <ScrollArea>
        <p className="text-center font-semibold text-sm text-zinc-500 hidden last:block p-2">
          No results found
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name!}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatCommunity;
