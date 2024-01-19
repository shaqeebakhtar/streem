'use client';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react';

type CopyButtonProps = {
  value: string;
};

const CopyButton = ({ value }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const copyValue = () => {
    if (!value) return;

    setCopied(true);

    navigator.clipboard.writeText(value);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div>
      <Button
        size={'icon'}
        variant={'secondary'}
        className="bg-zinc-700 hover:bg-zinc-600"
        onClick={copyValue}
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  );
};

export default CopyButton;
