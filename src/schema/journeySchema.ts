// import * as z from 'zod';
// const journeySchema = z.object({
//   journeyName: z
//     .string({ required_error: 'Journey name is required' })
//     .min(4, { message: 'The journey name must have at least 4 characters' }),
//   journeyLength: z
//     .number({ required_error: 'Length of the journey must be provided.' })
//     .min(10, { message: 'The journey must be at least 10 days long.' })
//     .max(30, { message: 'The journey must not exceed 30 days' }),
//   journeyDescription: z
//     .string({
//       required_error: 'Description must be provided',
//     })
//     .min(20, { message: 'Description must have 20 characters' }),
//   journeyImportance: z.array(), //need to be converted to  string
//   journeyUsages: z.string(),
//   learningQuotes: z.string(),
//   imageLink: z.string(),
//   //   actionSteps: z.array({
//   //     descriptionThis: z.string(),
//   //   }),
// });

// export default journeySchema;
