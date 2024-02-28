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
    image: z.union([
      z.any().optional(),
      z
        .object({
          0: z
            .object({
              lastModified: z.number(),
              lastModifiedDate: z.date(),
              name: z.string(),
              size: z.number(),
              type: z.string(),
              webkitRelativePath: z.string().optional(),
            })

            .refine((data) => data && data.size <= 5 * 1024 * 1024, {
              message: 'File size should not exceed 5MB',
              path: ['image', '0', 'size'], // specify the path of the error
            })
            .refine(
              (data) =>
                ['image/jpeg', 'image/png', 'image/gif'].includes(data.type),
              {
                message:
                  'Invalid file type. Only JPEG, PNG, and GIF types are allowed.',
                path: ['image', '0', 'type'], // specify the path of the error
              }
            ),
        })
        .optional(),
    ]),

    dateOfBirth: z.coerce.date(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
