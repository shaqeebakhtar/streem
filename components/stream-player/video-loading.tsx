import { Loader, VideoOff } from 'lucide-react';

type VideoLoadingProps = {
  label: string;
};

const VideoLoading = ({ label }: VideoLoadingProps) => {
  return (
    <div className="w-full h-full bg-primary/80 grid items-center">
      <div className="bg-zinc-800 rounded w-full max-w-2xl h-80 mx-auto flex items-center justify-center space-x-2">
        <Loader className="w-6 h-6 opacity-30 animate-spin" />
        <p className="text-xl font-semibold">{label}</p>
      </div>
    </div>
  );
};

export default VideoLoading;
