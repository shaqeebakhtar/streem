'use client';

import { createViewerToken } from '@/actions/token';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [identity, setIdentity] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name: string;
        };

        const jwtName = decodedToken.name;
        const jwtIdentity = decodedToken.jti;

        if (jwtIdentity) setIdentity(jwtIdentity);

        if (jwtName) setName(jwtName);
      } catch (error) {
        toast.error('Something went wrong');
      }
    })();
  }, [hostIdentity]);

  return {
    token,
    name,
    identity,
  };
};
