export type User = {
  createdAt: Date | string;
  id: number;
  email: string;
  lastName: string;
  firstName: string;
  isSuperAdmin: boolean;
  password: string;
  active: boolean;
  roleId: number;
  role: {
    createdAt: string | null;
    id: number;
    name: string;
    permissionsPerModule: {
      moduleName: string;
      permissions: string[];
    }[];
  };
  groupId: number;
  group: {
    createdAt: string | null;
    id: number;
    name: string;
    parentId: number;
    parent: null;
    children: null;
  };
};
