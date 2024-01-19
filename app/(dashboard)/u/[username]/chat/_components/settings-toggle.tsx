'use client';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import React, { useTransition } from 'react';
import { updateStream } from '../actions/stream';

type TField = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly';

interface SettingsToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: boolean;
  field: TField;
}

const SettingsToggle = ({
  className,
  label,
  value,
  field,
}: SettingsToggleProps) => {
  const [isPending, startTransition] = useTransition();

  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value });
    });
  };

  return (
    <div
      className={cn(
        'grid grid-cols-2 lg:grid-cols-5 items-center px-4 py-6 bg-zinc-900',
        className
      )}
    >
      <Label htmlFor={field} className="text-sm font-bold">
        {label}
      </Label>
      <Switch
        disabled={isPending}
        id={field}
        checked={value}
        onCheckedChange={onChange}
      />
    </div>
  );
};

export default SettingsToggle;
