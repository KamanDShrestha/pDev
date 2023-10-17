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

export const registerSchema = z
  .object({
    firstName: z
      .string({ required_error: 'First name is required' })
      .min(4, { message: 'Please provide your valid first name' }),
    lastName: z
      .string({ required_error: 'Last name is required' })
      .min(4, { message: 'Please provide your valid last name' }),
    email: z
      .string({ required_error: 'Email is required' })
      .min(1, { message: 'Please fill up the provided fields.' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(7, { message: 'The password must be at least 7 characters.' }),
    confirmPassword: z
      .string({ required_error: 'Confirm Password is required' })
      .min(7, { message: 'The password must be at least 7 characters.' }),
    dateOfBirth: z.coerce.date(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
