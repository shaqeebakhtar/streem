import { VideoOff } from 'lucide-react';

type OfflineProps = {
  username: string;
};

const Offline = ({ username }: OfflineProps) => {
  return (
    <div className="w-full h-full bg-primary/80 grid items-center">
      <div className="bg-zinc-800 sm:rounded w-full max-w-xl max-h-80 h-full mx-auto flex items-center justify-center">
        <div className="flex flex-col gap-3 items-center">
          <VideoOff className="w-8 h-8 opacity-30" />
          <p className="text-xl font-semibold">
            <span className="text-primary">{username}</span> is offline
          </p>
        </div>
      </div>
    </div>
  );
};

export default Offline;
