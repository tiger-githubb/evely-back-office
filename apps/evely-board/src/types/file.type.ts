export type FileType = {
  id: number;
  name: string;
  file: File | string;
  fileName: string;
  fileType: string;
  extension: string | null;
  description: string;
  size: number;
  groupId: number | null;
  ownerId: number;
  parentId: number;
  createdAt: string | null;
  children: FileType[] | null;
};
