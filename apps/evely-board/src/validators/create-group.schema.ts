import { messages } from '@/config/messages';
import { z } from 'zod';

// form zod validation schema
export const createGroupSchema = z.object({
  name: z
    .string()
    .min(1, { message: messages.nameIsRequired })
    .min(3, { message: messages.NameLengthMin }),
  parentId: z.number().optional(),
  color: z.string().optional(),
});

// generate form types from zod validation schema
export type CreateGroupInput = z.infer<typeof createGroupSchema>;
