export const routes = {
  home: '/',
  organisation: {
    users: '/organisation/users',
    roles: '/organisation/roles',
    modules: '/organisation/modules',
    groups: '/organisation/groups',
    permissions: '/organisation/permissions',
  },

  file: {
    dashboard: '/file',
    manager: '/file-manager',
    upload: '/file-manager/upload',
    create: '/file-manager/create',
  },

  welcome: '/welcome',
  comingSoon: '/coming-soon',
  accessDenied: '/access-denied',
  notFound: '/not-found',
  maintenance: '/maintenance',
  blank: '/blank',
  auth: {
    signUp: '/auth/sign-up',
    signIn: '/auth/sign-in',
    forgotPassword: '/auth/forgot-password',
    otp: '/auth/otp',
  },
};
