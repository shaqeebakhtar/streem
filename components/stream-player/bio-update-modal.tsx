import React, { TextareaHTMLAttributes, useState, useTransition } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Icons } from '../icons';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { updateChannel } from '@/app/(dashboard)/u/[username]/(home)/actions/channel';

type BioUpdateModalProps = {
  initialBio: string | null;
};

const BioUpdateModal = ({ initialBio }: BioUpdateModalProps) => {
  const [bio, setBio] = useState(initialBio || '');
  const [isPending, startTransition] = useTransition();
  const [open, setIsOpen] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateChannel({ bio: bio })
        .then(() => {
          toast.success('Stream updated');
          setIsOpen(!open);
        })
        .catch(() => toast.error('Something went wrong'));
    });
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant={'link'} className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your channel bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 my-4">
          <div className="space-y-1.5">
            <Label className="font-semibold">Bio</Label>
            <Textarea
              placeholder="Bio"
              className="border-2 border-zinc-700"
              onChange={onChange}
              value={bio}
              disabled={isPending}
            />
          </div>

          <DialogFooter>
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <Icons.spinner className="animate-spin w-4 h-4 mr-2" />
                )}
                Save
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BioUpdateModal;
