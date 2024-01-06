import { Icons } from '@/components/icons';
import ChooseUsernameForm from './_components/form';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth-options';

const ChooseUsername = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/register');
  }

  if (session.user.username) {
    redirect('/');
  }

  return (
    <div className="w-full bg-zinc-900 overflow-hidden max-w-lg shadow-md border rounded-xl flex flex-col items-center justify-center space-y-8 border-b p-12">
      <Icons.logo />
      <div className="w-full">
        <ChooseUsernameForm />
      </div>
    </div>
  );
};

export default ChooseUsername;
