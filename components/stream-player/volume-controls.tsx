import { Volume1, Volume2, VolumeX } from 'lucide-react';
import Hint from '../hint';
import { Slider } from '../ui/slider';

type VolumeControlsProps = {
  onToggle: () => void;
  onChange: (value: number) => void;
  value: number;
};

const VolumeControls = ({ onChange, onToggle, value }: VolumeControlsProps) => {
  const isMuted = value === 0;
  const isAboveHalf = value > 50;

  let Icon = Volume1;

  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }

  const label = isMuted ? 'Unmute' : 'Mute';

  const handleChange = (value: number[]) => {
    onChange(value[0]);
  };

  return (
    <div className="flex items-center gap-2">
      <Hint label={label} asChild>
        <button onClick={onToggle} className="p-1.5 hover:bg-white/10 rounded">
          <Icon className="w-5 h-5" />
        </button>
      </Hint>
      <Slider
        className="w-20 cursor-pointer"
        value={[value]}
        onValueChange={handleChange}
        max={100}
        step={1}
      />
    </div>
  );
};

export default VolumeControls;
