'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';

type GoogleAuthButtonProps = {
  isRegister?: boolean;
};

const GoogleAuthButton = ({ isRegister }: GoogleAuthButtonProps) => {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url');

  const callbackUrl = isRegister
    ? '/choose/username'
    : redirectUrl
    ? redirectUrl
    : '/';

  const handleSignin = () => {
    signIn('google', { callbackUrl: callbackUrl });
  };

  return (
    <Button className="font-semibold rounded-lg" onClick={handleSignin}>
      <Icons.google className="w-4 h-4 mr-2" />
      Continue with Google
    </Button>
  );
};

export default GoogleAuthButton;
