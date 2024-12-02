// src/validators/create-file.schema.ts
import { messages } from '@/config/messages';
import { z } from 'zod';

export const createFileSchema = (isEditMode: boolean) =>
  z.object({
    name: z
      .string()
      .min(1, { message: messages.nameIsRequired })
      .min(3, { message: messages.NameLengthMin }),
    file: isEditMode ? z.instanceof(File).optional() : z.instanceof(File),
    description: z.string().optional(),
    parentId: z.number().optional(),
  });

export type CreateFileInput = z.infer<ReturnType<typeof createFileSchema>>;
