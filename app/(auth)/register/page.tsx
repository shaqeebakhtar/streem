import Link from 'next/link';
import GoogleAuthButton from '../_components/google-auth-button';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Register = async () => {
  const session = await getServerSession();

  if (session && session.user) {
    redirect('/dashboard');
  }

  return (
    <div className="w-full max-w-md shadow-md border rounded-lg">
      <div className="flex flex-col items-center justify-center space-y-2 border-b px-4 py-8 text-center">
        <h3 className="text-xl font-semibold">Create your Streem account</h3>
        <p className="text-sm text-gray-500">
          Get started for free, and start or watch streams.
        </p>
      </div>
      <div className="flex flex-col space-y-3 px-8 py-8 sm:px-16 bg-primary/5">
        <GoogleAuthButton />
        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            className="font-semibold transition-colors hover:text-primary"
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
