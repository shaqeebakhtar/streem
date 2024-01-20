import { Maximize, Minimize } from 'lucide-react';
import Hint from '../hint';

type FullScreenControlsProps = {
  isFullScreen: boolean;
  onToggle: () => void;
};

const FullScreenControls = ({
  isFullScreen,
  onToggle,
}: FullScreenControlsProps) => {
  const Icon = isFullScreen ? Minimize : Maximize;

  const label = isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen';

  return (
    <Hint label={label} asChild>
      <button className="p-1.5 hover:bg-white/10 rounded" onClick={onToggle}>
        <Icon className="w-5 h-5" />
      </button>
    </Hint>
  );
};

export default FullScreenControls;
