'use client';
import { Key, MessageSquareText, Radio, Users } from 'lucide-react';
import NavigationItem from './navigation-item';
import { useSession } from 'next-auth/react';

const Navigation = () => {
  const { data: session } = useSession();

  const username = session?.user.username;

  const routes = [
    {
      label: 'Stream',
      icon: Radio,
      href: `/u/${username}`,
    },
    {
      label: 'Keys',
      icon: Key,
      href: `/u/${username}/keys`,
    },
    {
      label: 'Chat',
      icon: MessageSquareText,
      href: `/u/${username}/chat`,
    },
    {
      label: 'Community',
      icon: Users,
      href: `/u/${username}/community`,
    },
  ];

  return (
    <div>
      {routes.map((route) => {
        return (
          <NavigationItem
            key={route.href}
            label={route.label}
            icon={route.icon}
            href={route.href}
          />
        );
      })}
    </div>
  );
};

export default Navigation;
