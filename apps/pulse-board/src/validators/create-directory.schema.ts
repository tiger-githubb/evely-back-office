import { messages } from '@/config/messages';
import { z } from 'zod';

// form zod validation schema
export const createDirectorySchema = z.object({
  parentId: z.number().optional(),
  name: z
    .string()
    .min(1, { message: messages.nameIsRequired })
    .min(3, { message: messages.nameIsRequired }),
  description: z.string().optional(),
});

// generate form types from zod validation schema
export type CreateDirectoryInput = z.infer<typeof createDirectorySchema>;
