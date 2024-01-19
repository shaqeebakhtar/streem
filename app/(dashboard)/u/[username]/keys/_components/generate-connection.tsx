'use client';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IngressInput } from 'livekit-server-sdk';
import { AlertTriangle } from 'lucide-react';
import { useState, useTransition } from 'react';
import { createIngress } from '../actions/ingress';
import { toast } from 'sonner';

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

const GenerateConnection = () => {
  const [open, setIsOpen] = useState(false);
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);
  const [isPending, startTransition] = useTransition();

  const onGenerate = async () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success('Created a new stream key and url');
          setIsOpen(!open);
        })
        .catch(() => toast.error('Failed to create stream key and url'));
    });
  };

  return (
    <div className="px-4 py-6 bg-zinc-800 flex justify-end">
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Generate Connection</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-left">
              Generate new Stream key & Server url
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex gap-3 px-4 py-3 border border-yellow-600 rounded items-center text-yellow-600">
              <span>
                <AlertTriangle className="w-5 h-5" />
              </span>
              <p className="text-sm font-semibold">
                Generating a new stream key and url will reset the all the
                active streams using current connection.
              </p>
            </div>
            <Select
              disabled={isPending}
              value={ingressType}
              onValueChange={(value) => setIngressType(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Connection Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={RTMP}>RTMP</SelectItem>
                <SelectItem value={WHIP}>WHIP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending} onClick={onGenerate}>
                {isPending && (
                  <Icons.spinner className="animate-spin w-4 h-4 mr-2" />
                )}
                Generate
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenerateConnection;
