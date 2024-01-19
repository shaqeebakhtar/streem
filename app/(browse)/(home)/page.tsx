import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user && !session?.user.username) {
    redirect('/choose/username');
  }

  return (
    <>
      <p>Home</p>
    </>
  );
};

export default Home;
