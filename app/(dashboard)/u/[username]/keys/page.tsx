import { getStreamByUserId } from '@/services/stream';
import { getCurrentUser } from '@/services/user';
import GenerateConnection from './_components/generate-connection';
import ServerUrl from './_components/server-url';
import StreamKey from './_components/stream-key';

const Keys = async () => {
  const user = await getCurrentUser();
  const stream = await getStreamByUserId(user.id);

  if (!stream) {
    throw new Error('Stream not found');
  }

  return (
    <div className="p-4 lg:p-8 flex justify-center">
      <div className="w-full max-w-5xl space-y-4">
        <h3 className="font-semibold text-lg">Stream Key & Server Url</h3>
        <div className="overflow-hidden rounded-lg border border-zinc-600">
          <StreamKey
            className="border-b border-zinc-600"
            streamKey={stream?.streamKey}
          />
          <ServerUrl serverUrl={stream?.serverUrl} />
          <GenerateConnection />
        </div>
      </div>
    </div>
  );
};

export default Keys;
