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

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(4, { message: 'Please provide your valid first name' }),
  lastName: z
    .string()
    .min(4, { message: 'Please provide your valid last name' }),
  email: z
    .string()
    .min(1, { message: 'Please fill up the provided fields.' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(7, { message: 'The password must be at least 7 characters.' }),
  dob: z.coerce.date(),
});
