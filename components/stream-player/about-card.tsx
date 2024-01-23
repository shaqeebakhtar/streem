import BioUpdateModal from './bio-update-modal';

type AboutCardProps = {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followersCount: number;
};

const AboutCard = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  bio,
  followersCount,
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followersCountLabel = followersCount === 1 ? 'follower' : 'followers';

  return (
    <div className="bg-zinc-900 p-4 m-3 rounded-lg space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-lg font-bold">About {hostName}</p>
          <div className="space-x-1 text-sm text-zinc-500 font-semibold">
            <span className="text-white">{followersCount}</span>
            <span>{followersCountLabel}</span>
          </div>
        </div>
        {isHost && <BioUpdateModal initialBio={bio} />}
      </div>
      <div>
        <p>{bio || `No description about ${hostName}`}</p>
      </div>
    </div>
  );
};

export default AboutCard;
