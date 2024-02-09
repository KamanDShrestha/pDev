// import React from 'react';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from './ui/card';
// import Heading from './Heading';
// import ErrorMessage from './ErrorMessage';

// import { useForm } from 'react-hook-form';
// import LoadingSpinner from './LoadingSpinner';
// import { Input } from './ui/input';
// import { Switch } from './ui/switch';
// import { Textarea } from './ui/textarea';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from './ui/select';

// const AddLearningVideoCard = () => {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     reset,
//   } = useForm();
//   return (
//     <Card className='w-[400px] lg:w-[600px]'>
//       <CardHeader>
//         <CardTitle>Add new quotes for users</CardTitle>
//         <CardDescription>You can add new quotation for users</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div>
//           <Heading className='mb-1 text-lg font-medium'>Quote</Heading>
//           <Textarea
//             {...register('quote', {
//               required: 'Quote is required',
//               minLength: {
//                 value: 10,
//                 message: 'Quote should be at least 10 characters long',
//               },
//             })}
//           />
//           {errors.quote && (
//             <ErrorMessage>{errors.quote.message as string}</ErrorMessage>
//           )}
//         </div>
//         <div>
//           <Heading className='mb-1 text-lg font-medium'>Author</Heading>
//           <Input
//             {...register('author', {
//               required: 'Author is required',
//               minLength: {
//                 value: 4,
//                 message: 'Author should be at least 4 characters long',
//               },
//             })}
//           />
//           {errors.author && (
//             <ErrorMessage>{errors.author.message as string}</ErrorMessage>
//           )}
//         </div>
//         <div className='flex flex-col gap-3 my-3'>
//           {isCategoryFetching && <LoadingSpinner />}
//           {categories && categories.length === 0 ? (
//             <p>No existing categories found.</p>
//           ) : (
//             <Select
//               disabled={isAddingNewCategory}
//               onValueChange={(category) => setSelectedCategory(category)}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder='Category' />
//               </SelectTrigger>
//               <SelectContent>
//                 {categories?.map((category) => (
//                   <SelectItem key={category} value={category}>
//                     {category}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           )}
//           <div className='space-y-3'>
//             <div className='flex items-center gap-3'>
//               <Switch
//                 checked={isAddingNewCategory}
//                 onCheckedChange={() =>
//                   setIsAddingNewCategory((previous) => !previous)
//                 }
//               />
//               <Heading className='m-0 text-md'>New category?</Heading>
//             </div>
//             {isAddingNewCategory && (
//               <div>
//                 <Heading className='mb-0 font-medium text-md'>
//                   New Category
//                 </Heading>
//                 <Input
//                   disabled={!isAddingNewCategory}
//                   {...register('category', {
//                     required: 'Category is required',
//                     minLength: {
//                       value: 4,
//                       message: 'Category should be at least 4 characters long',
//                     },
//                   })}
//                 />
//                 {errors.category && (
//                   <ErrorMessage>
//                     {errors.category.message as string}
//                   </ErrorMessage>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </CardContent>
//       {/* <CardFooter>
//       <Button onClick={handleSubmit(handleQuoteSubmit)}>
//         {isAddingQuote ? <LoadingSpinner /> : 'Add Quote'}
//       </Button>
//     </CardFooter> */}
//     </Card>
//   );
// };

// export default AddLearningVideoCard;
