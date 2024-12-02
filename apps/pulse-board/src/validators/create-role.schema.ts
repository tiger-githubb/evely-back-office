import { messages } from '@/config/messages';
import { z } from 'zod';

const permissionPerModuleSchema = z.object({
  moduleId: z.number(),
  permissionId: z.number(),
});

export const createRoleSchema = z.object({
  name: z.string().min(1, { message: messages.roleNameIsRequired }),
  color: z.string().nullable(),
  permissionsPerModule: z.array(permissionPerModuleSchema),
});

export type CreateRoleInput = z.infer<typeof createRoleSchema>;
