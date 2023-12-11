// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from '../../components/ui/select';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '../../components/ui/card';
// import useAddCommunity from '../../services/community/addCommunity';
// import ErrorMessage from '../../components/ErrorMessage';
// import InputFieldLabel from '../../components/InputFieldLabel';
// import { Button } from '../../components/ui/button';
// import { Input } from '../../components/ui/input';
// import { Textarea } from '../../components/ui/textarea';

// import { useForm } from 'react-hook-form';

// const AddCommunity = () => {
//   const { mutate: addCommunity } = useAddCommunity();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   return (
//     <div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Add new community for the users !</CardTitle>
//           <CardDescription>
//             Through this, add new community for the users can be added
//           </CardDescription>
//         </CardHeader>
//         <CardContent className='overflow-scroll h-[600px]'>
//           <div className='flex flex-col gap-3'>
//             <div className='relative group'>
//               <InputFieldLabel
//                 htmlFor='journeyName'
//                 hasContent={
//                   providedName !== undefined && providedName?.length !== 0
//                 }
//               >
//                 Journey Name
//               </InputFieldLabel>
//               <Input
//                 {...register('communityName', {
//                   required: 'Journey name need to be provided',
//                   minLength: {
//                     value: 5,
//                     message: 'Journey name must have at least 5 characters',
//                   },
//                 })}
//                 type='text'
//               />
//               {errors.journeyName && (
//                 <ErrorMessage>
//                   {errors.journeyName.message as string}
//                 </ErrorMessage>
//               )}
//             </div>
//             <div className='relative group'>
//               <InputFieldLabel
//                 htmlFor='communityDescription'
//                 hasContent={
//                   providedDescription !== undefined &&
//                   providedDescription?.length !== 0
//                 }
//               >
//                 Journey Description
//               </InputFieldLabel>
//               <Textarea
//                 {...register('journeyDescription', {
//                   required: 'Description need to be provided',
//                   minLength: {
//                     value: 20,
//                     message: 'Description must have at least 20 characters',
//                   },
//                   maxLength: {
//                     value: 500,
//                     message:
//                       'Description must not have more than 500 characters',
//                   },
//                 })}
//               />
//               {errors.journeyDescription && (
//                 <ErrorMessage>
//                   {errors.journeyDescription.message as string}
//                 </ErrorMessage>
//               )}
//             </div>

//             <div className='flex flex-col gap-2'>
//               <label htmlFor='iconImageLinks' className='font-medium'>
//                 Icon Image Links
//               </label>
//               <div className='space-y-2'>
//                 <div className='relative group'>
//                   <InputFieldLabel
//                     htmlFor='journeyDescription'
//                     hasContent={
//                       providedDarkIconImage !== undefined &&
//                       providedDarkIconImage?.length !== 0
//                     }
//                   >
//                     For Dark Mode
//                   </InputFieldLabel>
//                   <Input
//                     {...register('journeyIconImageDark', {
//                       required: 'Image link for dark mode need to be provided',
//                     })}
//                     type='text'
//                   />
//                   {errors.journeyIconImageDark && (
//                     <ErrorMessage>
//                       {errors.journeyIconImageDark.message as string}
//                     </ErrorMessage>
//                   )}
//                 </div>
//                 <div className='relative group'>
//                   <InputFieldLabel
//                     htmlFor='journeyDescription'
//                     hasContent={
//                       providedLightIconImage !== undefined &&
//                       providedLightIconImage?.length !== 0
//                     }
//                   >
//                     For Light Mode
//                   </InputFieldLabel>
//                   <Input
//                     {...register('journeyIconImageLight', {
//                       required: 'Image link for light mode need to be provided',
//                     })}
//                     type='text'
//                   />
//                   {errors.journeyIconImageLight && (
//                     <ErrorMessage>
//                       {errors.journeyIconImageLight.message as string}
//                     </ErrorMessage>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className='relative group'>
//               <label htmlFor='journeyImportance' className='font-medium'>
//                 Journey Importance
//               </label>
//               <div className='relative flex flex-col gap-2'>
//                 {Array.from(Array(3)).map((_, index) => (
//                   <>
//                     <Input
//                       key={index}
//                       {...register(`journeyImportance${index + 1}`, {
//                         required: 'Please provide importance for this journey',
//                       })}
//                     />
//                     {errors[`journeyImportance${index + 1}`] && (
//                       <ErrorMessage>
//                         {
//                           errors[`journeyImportance${index + 1}`]
//                             ?.message as string
//                         }
//                       </ErrorMessage>
//                     )}
//                   </>
//                 ))}
//               </div>
//             </div>

//             <div className='relative group'>
//               <label htmlFor='journeyUsages' className='font-medium'>
//                 Journey Usages
//               </label>
//               <div className='relative flex flex-col gap-2 group'>
//                 {Array.from(Array(3)).map((_, index) => (
//                   <>
//                     <Input
//                       key={index}
//                       {...register(`journeyUsage${index + 1}`, {
//                         required: 'Please provide usages for this journey',
//                       })}
//                     />
//                     {errors[`journeyUsage${index + 1}`] && (
//                       <ErrorMessage>
//                         {errors[`journeyUsage${index + 1}`]?.message as string}
//                       </ErrorMessage>
//                     )}
//                   </>
//                 ))}
//               </div>
//             </div>
//             <div className='relative group'>
//               <label htmlFor='journeyQuotes' className='font-medium'>
//                 Journey Quotes
//               </label>
//               <div className='relative flex flex-col gap-2 group'>
//                 {Array.from(Array(3)).map((_, index) => (
//                   <>
//                     <Input
//                       key={index}
//                       {...register(`journeyQuotes${index + 1}`, {
//                         required: 'Please provide quotes for this journey',
//                       })}
//                     />
//                     {errors[`journeyQuotes${index + 1}`] && (
//                       <ErrorMessage>
//                         {errors[`journeyQuotes${index + 1}`]?.message as string}
//                       </ErrorMessage>
//                     )}
//                   </>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <label htmlFor='journeyQuotes' className='font-medium'>
//                 Select the length of journey
//               </label>
//               <Select
//                 onValueChange={(value) =>
//                   setNumberOfActionSteps(parseInt(value))
//                 }
//                 defaultValue={numberOfActionSteps.toString()}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder='Select the length of journey' />
//                 </SelectTrigger>
//                 <SelectContent className='overflow-scroll'>
//                   <SelectGroup>
//                     <SelectLabel>Length of the journey</SelectLabel>
//                     {Array.from(Array(20)).map((_, index) => (
//                       <>
//                         <SelectItem value={(index + 10).toString()}>
//                           {index + 10}
//                         </SelectItem>
//                       </>
//                     ))}
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Button>Submit</Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default AddCommunity;
