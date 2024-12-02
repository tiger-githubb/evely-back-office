import { routes } from '@/config/routes';

// Note: do not add href in the label object, it is rendering as label
export const pageLinks = [
  // label start
  {
    name: 'Home',
  },
  // label end

  // label end

  // label start
  {
    name: 'Widgets',
  },
  // label end

  // {
  //   name: 'Banners',
  //   href: routes.widgets.banners,
  // },

  // label start
  {
    name: 'Forms',
  },
  // label end

  // {
  //   name: 'Multi Step',
  //   href: routes.forms.multiStep,
  // },

  // label start
  {
    name: 'Tables',
  },
  // label end

  // label start
  {
    name: 'Pages',
  },
  // label end

  {
    name: 'Welcome',
    href: routes.welcome,
  },
  {
    name: 'Coming soon',
    href: routes.comingSoon,
  },
  {
    name: 'Access Denied',
    href: routes.accessDenied,
  },
  {
    name: 'Not Found',
    href: routes.notFound,
  },
  {
    name: 'Maintenance',
    href: routes.maintenance,
  },
  {
    name: 'Blank',
    href: routes.blank,
  },
  // label start
  {
    name: 'Authentication',
  },
  // label end
];
