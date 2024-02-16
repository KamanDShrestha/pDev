import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import useAddCommunity from '../../services/community/addCommunity';
import ErrorMessage from '../../components/ErrorMessage';
import InputFieldLabel from '../../components/InputFieldLabel';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';

import { FieldValues, useForm } from 'react-hook-form';
import { useGetAllJourneys } from '../../services/journey/getAllJourneys';
import { useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import useDocumentTitle from '../../services/getTitle';

const AddCommunity = () => {
  const { mutate: addCommunity, isLoading: isCreatingCommunity } =
    useAddCommunity();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const { data: journeys } = useGetAllJourneys();
  const [selectedJourney, setSelectedJourney] = useState('');
  const [isJourneySelected, setIsSelectedJourney] = useState(true);

  const providedName = watch('communityName');
  const providedDescription = watch('communityDescription');
  const providedDarkIconImage = watch('communityIconImageDark');
  const providedLightIconImage = watch('communityIconImageLight');

  useDocumentTitle('Add Community - SelfSync');

  function handleAddCommunity(data: FieldValues) {
    if (selectedJourney === '') {
      setIsSelectedJourney(false);
      return;
    }

    addCommunity(
      {
        journeyId: selectedJourney,
        communityName: data.communityName,
        communityDescription: data.communityDescription,
        communityIcon: {
          dark: data.communityIconImageDark,
          light: data.communityIconImageLight,
        },
      },
      {
        onSuccess: () => {
          reset({
            communityName: '',
            communityDescription: '',
            communityIconImageDark: '',
            communityIconImageLight: '',
          });
        },
      }
    );
  }

  return (
    <div className='flex justify-center'>
      <Card className='max-w-[600px]'>
        <CardHeader>
          <CardTitle>Add new community for the users !</CardTitle>
          <CardDescription>
            Through this, add new community for the users can be added
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-3'>
            <div className='relative group'>
              <InputFieldLabel
                htmlFor='journeyName'
                hasContent={
                  providedName !== undefined && providedName?.length !== 0
                }
              >
                Community Name
              </InputFieldLabel>
              <Input
                {...register('communityName', {
                  required: 'Community name need to be provided',
                  minLength: {
                    value: 5,
                    message: 'Community name must have at least 5 characters',
                  },
                })}
                type='text'
              />
              {errors.communityName && (
                <ErrorMessage>
                  {errors.communityName.message as string}
                </ErrorMessage>
              )}
            </div>
            <div className='relative group'>
              <InputFieldLabel
                htmlFor='communityDescription'
                hasContent={
                  providedDescription !== undefined &&
                  providedDescription?.length !== 0
                }
              >
                Community Description
              </InputFieldLabel>
              <Textarea
                {...register('communityDescription', {
                  required: 'Description need to be provided',
                  minLength: {
                    value: 20,
                    message: 'Description must have at least 20 characters',
                  },
                  maxLength: {
                    value: 500,
                    message:
                      'Description must not have more than 500 characters',
                  },
                })}
              />
              {errors.communityDescription && (
                <ErrorMessage>
                  {errors.communityDescription.message as string}
                </ErrorMessage>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='iconImageLinks' className='font-medium'>
                Icon Image Links
              </label>
              <div className='space-y-2'>
                <div className='relative group'>
                  <InputFieldLabel
                    htmlFor='communityIconImageDark'
                    hasContent={
                      providedDarkIconImage !== undefined &&
                      providedDarkIconImage?.length !== 0
                    }
                  >
                    For Dark Mode
                  </InputFieldLabel>
                  <Input
                    {...register('communityIconImageDark', {
                      required: 'Image link for dark mode need to be provided',
                    })}
                    type='text'
                  />
                  {errors.communityIconImageDark && (
                    <ErrorMessage>
                      {errors.communityIconImageDark.message as string}
                    </ErrorMessage>
                  )}
                </div>
                <div className='relative group'>
                  <InputFieldLabel
                    htmlFor='communityDescription'
                    hasContent={
                      providedLightIconImage !== undefined &&
                      providedLightIconImage?.length !== 0
                    }
                  >
                    For Light Mode
                  </InputFieldLabel>
                  <Input
                    {...register('communityIconImageLight', {
                      required: 'Image link for light mode need to be provided',
                    })}
                    type='text'
                  />
                  {errors.communityIconImageLight && (
                    <ErrorMessage>
                      {errors.communityIconImageLight.message as string}
                    </ErrorMessage>
                  )}
                </div>
              </div>
            </div>

            {/* <div className='relative group'>
              <label htmlFor='communityImportance' className='font-medium'>
                Journey Importance
              </label>
              <div className='relative flex flex-col gap-2'>
                {Array.from(Array(3)).map((_, index) => (
                  <>
                    <Input
                      key={index}
                      {...register(`journeyImportance${index + 1}`, {
                        required: 'Please provide importance for this journey',
                      })}
                    />
                    {errors[`journeyImportance${index + 1}`] && (
                      <ErrorMessage>
                        {
                          errors[`journeyImportance${index + 1}`]
                            ?.message as string
                        }
                      </ErrorMessage>
                    )}
                  </>
                ))}
              </div>
            </div> */}

            {/* <div className='relative group'>
              <label htmlFor='journeyUsages' className='font-medium'>
                Journey Usages
              </label>
              <div className='relative flex flex-col gap-2 group'>
                {Array.from(Array(3)).map((_, index) => (
                  <>
                    <Input
                      key={index}
                      {...register(`journeyUsage${index + 1}`, {
                        required: 'Please provide usages for this journey',
                      })}
                    />
                    {errors[`journeyUsage${index + 1}`] && (
                      <ErrorMessage>
                        {errors[`journeyUsage${index + 1}`]?.message as string}
                      </ErrorMessage>
                    )}
                  </>
                ))}
              </div>
            </div> */}
            {/* <div className='relative group'>
              <label htmlFor='journeyQuotes' className='font-medium'>
                Journey Quotes
              </label>
              <div className='relative flex flex-col gap-2 group'>
                {Array.from(Array(3)).map((_, index) => (
                  <>
                    <Input
                      key={index}
                      {...register(`journeyQuotes${index + 1}`, {
                        required: 'Please provide quotes for this journey',
                      })}
                    />
                    {errors[`journeyQuotes${index + 1}`] && (
                      <ErrorMessage>
                        {errors[`journeyQuotes${index + 1}`]?.message as string}
                      </ErrorMessage>
                    )}
                  </>
                ))}
              </div>
            </div> */}
            <div>
              <label htmlFor='journeyQuotes' className='font-medium'>
                Select the journey associated with this community
              </label>
              <Select
                onValueChange={(value) => {
                  setIsSelectedJourney(true);
                  setSelectedJourney(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select the journey' />
                </SelectTrigger>
                <SelectContent className='overflow-scroll'>
                  <SelectGroup>
                    <SelectLabel>Journeys</SelectLabel>

                    {journeys &&
                      journeys.map((journey) => (
                        <SelectItem value={journey._id}>
                          {journey.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {!isJourneySelected && (
                <ErrorMessage>Please select a journey</ErrorMessage>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit(handleAddCommunity)}>
            {isCreatingCommunity ? <LoadingSpinner /> : 'Submit'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddCommunity;
