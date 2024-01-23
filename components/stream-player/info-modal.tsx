import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Hint from '@/components/hint';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { updateStream } from '@/app/(dashboard)/u/[username]/chat/actions/stream';
import { Icons } from '../icons';
import { UploadDropzone } from '@/lib/uploadthing';
import Image from 'next/image';
import { Trash, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type InfoModalProps = {
  initialName: string;
  initialThumbnailUrl: string | null;
};

const InfoModal = ({ initialName, initialThumbnailUrl }: InfoModalProps) => {
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
  const [isPending, startTransition] = useTransition();
  const [open, setIsOpen] = useState(false);
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success('Thumbnail removed');
          setThumbnailUrl('');
        })
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success('Stream updated');
          setIsOpen(!open);
        })
        .catch(() => toast.error('Something went wrong'));
    });
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'link'} className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit stream information</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 my-4">
          <div className="space-y-1.5">
            <Label className="font-semibold">Name</Label>
            <Input
              placeholder="Stream Name"
              className="border-2 border-zinc-700"
              onChange={onChange}
              value={name}
              disabled={isPending}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-semibold">Thumbnail</Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-50">
                  <Hint label="Remove thumbnail" asChild side="left">
                    <Button
                      type="button"
                      disabled={isPending}
                      onClick={onRemove}
                      size={'icon'}
                      className="p-1.5"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  alt="Thumbnail"
                  src={thumbnailUrl}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-lg outline-dashed outline-zinc-700">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: '#FFFFFF',
                    },
                    allowedContent: {
                      color: '#FFFFFF',
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.url);
                    router.refresh();
                    setIsOpen(!open);
                  }}
                />
              </div>
            )}
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

export default InfoModal;
