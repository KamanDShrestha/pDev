import * as z from 'zod';

const profileCompletionSchema = z.object({
  answer1: z
    .string()
    .min(1, { message: 'Please fill up the provided fields.' }),
  answer2: z
    .string()
    .min(1, { message: 'Please fill up the provided fields.' }),
  answer3: z
    .string()
    .min(1, { message: 'Please fill up the provided fields.' }),
});

export default profileCompletionSchema;
