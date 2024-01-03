'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const GoogleAuthButton = () => {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url');

  const handleSignin = () => {
    signIn('google', { callbackUrl: redirectUrl as string });
  };

  return (
    <Button className="font-semibold" onClick={handleSignin}>
      <Icons.google className="w-4 h-4 mr-2" />
      Continue with Google
    </Button>
  );
};

export default GoogleAuthButton;
