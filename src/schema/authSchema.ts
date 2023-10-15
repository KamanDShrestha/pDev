import * as z from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please fill up the provided fields.' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(7, { message: 'The password must be at least 7 characters.' }),
});
