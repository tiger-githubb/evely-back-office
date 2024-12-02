import { routes } from '@/config/routes';
import {
  PiCardsThreeDuotone,
  PiHouseDuotone,
  PiInfoDuotone,
  PiLockKeyDuotone,
  PiShieldCheckDuotone,
  PiShootingStarDuotone,
  PiUserPlusDuotone,
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: 'Overview',
  },
  // label end
  {
    name: 'Accueil',
    href: routes.home,
    icon: <PiHouseDuotone />,
  },

  {
    name: 'Organisation',
  },
  {
    name: 'Modules',
    href: routes.organisation.modules,
    icon: <PiCardsThreeDuotone />,
  },

  {
    name: 'Utilisateurs',
  },
  {
    name: 'Permissions',
    href: routes.organisation.permissions,
    icon: <PiLockKeyDuotone />,
  },
  {
    name: 'Roles',
    href: routes.organisation.roles,
    icon: <PiShieldCheckDuotone />,
  },
  {
    name: 'Utilisateurs',
    href: routes.organisation.users,
    icon: <PiUserPlusDuotone />,
  },

  // {
  //   name: 'Pages',
  // },

  {
    name: 'Welcome',
    href: '#',
    icon: <PiShootingStarDuotone />,
    badge: 'NEW',
  },
  // {
  //   name: 'Coming soon',
  //   href: routes.comingSoon,
  //   icon: <PiRocketLaunchDuotone />,
  // },
  // {
  //   name: 'Access Denied',
  //   href: routes.accessDenied,
  //   icon: <PiFolderLockDuotone />,
  // },
  // {
  //   name: 'Not Found',
  //   href: routes.notFound,
  //   icon: <PiBinocularsDuotone />,
  // },
  // {
  //   name: 'Maintenance',
  //   href: routes.maintenance,
  //   icon: <PiHammerDuotone />,
  // },
  // {
  //   name: 'Blank',
  //   href: routes.blank,
  //   icon: <PiNoteBlankDuotone />,
  // },

  // // label start
  // {
  //   name: 'Authentication',
  // },
  // // label end
  {
    name: 'Info',
    href: '#',
    icon: <PiInfoDuotone />,
    dropdownItems: [
      {
        name: 'info',
        href: '#',
        badge: 'NEW',
      },
    ],
  },
  // {
  //   name: 'Sign In',
  //   href: '#',
  //   icon: <PiShieldCheckDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Modern Sign in',
  //       href: routes.auth.signIn,
  //       badge: '',
  //     },
  //     {
  //       name: 'Vintage Sign in',
  //       href: routes.auth.signIn,
  //     },
  //     {
  //       name: 'Trendy Sign in',
  //       href: routes.auth.signIn,
  //     },
  //     {
  //       name: 'Elegant Sign in',
  //       href: routes.auth.signIn,
  //     },
  //     {
  //       name: 'Classic Sign in',
  //       href: routes.auth.signIn,
  //     },
  //   ],
  // },
  // {
  //   name: 'Forgot Password',
  //   href: '#',
  //   icon: <PiLockKeyDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Elegant Forgot password',
  //       href: routes.auth.forgotPassword,
  //     },
  //   ],
  // },
];
