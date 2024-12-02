import { ModuleType } from './module.type';
import { PermissionType } from './permission.type';

type PermissionPerModule = {
  module: ModuleType;
  permission: PermissionType;
};

export type RoleType = {
  id: number;
  name: string;
  color: string | null;
  createdAt: Date;
  _count: {
    users: number;
  };
  permissionsPerModule: PermissionPerModule[];
};
