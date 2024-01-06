import { Icons } from '@/components/icons';
import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import GoogleAuthButton from '../_components/google-auth-button';

const Register = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user && !session.user.username) {
    redirect('/choose/username');
  }

  if (session?.user) {
    redirect('/');
  }

  return (
    <div className="w-full overflow-hidden max-w-md shadow-md border rounded-xl">
      <div className="flex flex-col items-center justify-center space-y-6 border-b px-4 py-12 text-center">
        <Icons.logo />
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">Create your Streem account</h3>
          <p className="text-sm text-muted-foreground">
            Get started for free, and start or watch streams.
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-3 px-8 py-8 sm:px-16 bg-zinc-900/30">
        <GoogleAuthButton isRegister={true} />
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            className="font-bold transition-colors hover:text-primary"
            href="/login"
          >
            Sign in
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
