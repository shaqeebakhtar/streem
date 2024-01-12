import { authOptions } from '@/lib/auth-options';
import { getStreamByUserId } from '@/services/stream';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SettingsToggle from './settings-toggle';

const ChatSettings = async () => {
  const session = await getServerSession(authOptions);
  const stream = await getStreamByUserId(session?.user.id!);

  if (!stream) {
    redirect('/');
  }

  return (
    <div className="w-full max-w-5xl space-y-4">
      <h3 className="font-semibold text-lg">Chat Settings</h3>
      <div className="overflow-hidden rounded-lg border border-zinc-600">
        <SettingsToggle
          className="border-b border-zinc-600"
          field="isChatEnabled"
          label="Disable Chat"
          value={stream?.isChatEnabled!}
        />
        <SettingsToggle
          className="border-b border-zinc-600"
          field="isChatDelayed"
          label="Delay Chat"
          value={stream?.isChatDelayed!}
        />
        <SettingsToggle
          field="isChatFollowersOnly"
          label="Followers Only Chat"
          value={stream?.isChatFollowersOnly!}
        />
      </div>
    </div>
  );
};

export default ChatSettings;
