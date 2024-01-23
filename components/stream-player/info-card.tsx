import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '../ui/separator';
import InfoModal from './info-modal';

type InfoCardProps = {
  hostIdentity: string;
  viewerIdentity: string;
  name: string;
  thumbnailUrl: string | null;
};

const InfoCard = ({
  hostIdentity,
  viewerIdentity,
  name,
  thumbnailUrl,
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) return null;

  return (
    <div className="m-3 bg-zinc-800 rounded-lg">
      <div className="flex items-center gap-3 p-4">
        <div className="p-2 rounded bg-primary">
          <Pencil className="w-5 h-5" />
        </div>
        <div className="space-y-0">
          <p className="font-semibold">Edit Your Stream Info</p>
          <p className="text-xs text-zinc-500 font-semibold">
            Maximize your visibility
          </p>
        </div>
        <InfoModal initialName={name} initialThumbnailUrl={thumbnailUrl} />
      </div>
      <Separator className="bg-zinc-700" />
      <div className="p-4 space-y-3">
        <div className="space-y-0.5">
          <p className="font-semibold text-sm text-zinc-500">Name</p>
          <p>{name}</p>
        </div>
        <div className="space-y-0.5">
          <p className="font-semibold text-sm text-zinc-500">Thumbnail</p>
          {thumbnailUrl && (
            <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
              <Image
                fill
                src={thumbnailUrl}
                alt={name}
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
