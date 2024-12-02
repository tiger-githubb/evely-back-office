import { messages } from '@/config/messages';
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email({ message: messages.emailIsRequired }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  isSuperAdmin: z.boolean().default(false),
  active: z.boolean().default(false),
  roleId: z.number({ required_error: 'Role ID is required' }),
  groupId: z.number({ required_error: 'Group ID is required' }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
