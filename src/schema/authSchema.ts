import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(7, { message: 'The password must be at least 7 characters.' }),
});
