import { messages } from '@/config/messages';
import { z } from 'zod';

// form zod validation schema
export const createModuleSchema = z.object({
  name: z
    .string()
    .min(1, { message: messages.nameIsRequired })
    .min(3, { message: messages.NameLengthMin }),
});

// generate form types from zod validation schema
export type CreateModuleInput = z.infer<typeof createModuleSchema>;
