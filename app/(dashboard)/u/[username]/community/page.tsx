import { getAllBlockedChannels } from '@/services/block';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { format } from 'date-fns';

const CommunityPage = async () => {
  const blockedChannels = await getAllBlockedChannels();

  const formattedData = blockedChannels.map((blockedChannel) => ({
    ...blockedChannel,
    channelId: blockedChannel.blocking.id,
    image: blockedChannel.blocking.image,
    username: blockedChannel.blocking.username,
    createdAt: format(
      new Date(blockedChannel.blocking.createdAt),
      'dd/MM/yyyy'
    ),
  }));

  return (
    <div className="p-4 lg:p-8 flex justify-center">
      <div className="w-full max-w-5xl space-y-4">
        <h3 className="font-semibold text-lg">Community Settings</h3>
        <DataTable columns={columns} data={formattedData} />
      </div>
    </div>
  );
};

export default CommunityPage;
