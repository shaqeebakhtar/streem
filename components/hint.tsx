import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type HintProps = {
  children: React.ReactNode;
  asChild?: boolean;
  label: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'center' | 'end' | 'start';
};

const Hint = ({ children, asChild, label, align, side }: HintProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent
          align={align}
          side={side}
          className="bg-white text-background font-medium"
        >
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Hint;
