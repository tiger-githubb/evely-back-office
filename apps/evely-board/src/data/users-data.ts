import { ROLES } from '@/config/constants';

export type User = {
  id: string;
  avatar: string;
  fullName: string;
  email: string;
  role: keyof typeof ROLES;
  createdAt: Date;
  permissions: keyof typeof PERMISSIONS;
  status: keyof typeof STATUSES;
};

export const PERMISSIONS = {
  Read: 'Read',
  Write: 'Write',
  Delete: 'Delete',
} as const;

export const STATUSES = {
  Active: 'Active',
  Deactivated: 'Deactivated',
} as const;
