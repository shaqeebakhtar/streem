'use client';
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
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const GenerateConnection = () => {
  const [open, setIsOpen] = useState(false);

  return (
    <div className="px-4 py-6 bg-zinc-800 flex justify-end">
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Generate Connection</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate new Stream key & Server url</DialogTitle>
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
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Connection Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RTMP">RTMP</SelectItem>
                <SelectItem value="WHIP">WHIP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Generate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenerateConnection;
