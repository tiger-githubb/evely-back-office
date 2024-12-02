// src/types/archive.type.ts
import { GroupType } from './group.type';
import { User } from './user.type';

export type ArchiveType = {
  createdAt: string;
  id: number;
  name: string;
  description: string;
  fileName: string | null;
  extension: string | null;
  file: File | string;
  fileType: 'dir' | 'document' | 'compressed' | 'video';
  size: number | null;
  ownerId: number;
  groupId: number;
  parentId: number | null;
  owner: Omit<User, 'password'>; // Exclude password for security
  group: Omit<GroupType, 'updatedAt'>;
  children: ArchiveType[] | null; // Allow nested archives
};
