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
import Heading from '../../components/Heading';

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

  const [lightImage, setLightImage] = useState<File | null>(null);
  const [darkImage, setDarkImage] = useState<File | null>(null);
  const [lightImageURL, setLightImageURL] = useState<string>();
  const [darkImageURL, setDarkImageURL] = useState<string>();
  const [lightImageError, setLightImageError] = useState<string | null>(null);
  const [darkImageError, setDarkImageError] = useState<string | null>(null);

  const providedName = watch('communityName');
  const providedDescription = watch('communityDescription');

  function handleLightCommunityIconChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setLightImageError(null);

    if (e.target.files) {
      if (e.target.files[0].type.split('/')[0] !== 'image') {
        setLightImageError('Please provide a valid image file');
        return;
      }
      if (e.target.files[0].size > 5000000) {
        setLightImageError('Please provide an image of size less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLightImageURL(reader.result as string);
      };
      setLightImage(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function handleDarkCommunityIconChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setDarkImageError(null);

    if (e.target.files) {
      if (e.target.files[0].type.split('/')[0] !== 'image') {
        setDarkImageError('Please provide a valid image file');
        return;
      }
      if (e.target.files[0].size > 5000000) {
        setDarkImageError('Please provide an image of size less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setDarkImageURL(reader.result as string);
      };
      setDarkImage(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  useDocumentTitle('Add Community - SelfSync');

  function handleAddCommunity(data: FieldValues) {
    if (!(lightImage instanceof File)) {
      setLightImageError('Please provide an image before updating.');

      return;
    }
    if (!(darkImage instanceof File)) {
      setDarkImageError('Please provide an image before updating.');
      return;
    }
    if (selectedJourney === '') {
      setIsSelectedJourney(false);
      return;
    }

    const formData = new FormData();

    if (lightImage) {
      formData.append('communityIconLight', lightImage);
      setLightImageError(null);
    } else {
      setLightImageError('Please provide an image before updating.');
      return;
    }
    if (darkImage) {
      formData.append('communityIconDark', darkImage);
      setLightImageError(null);
    } else {
      setDarkImageError('Please provide an image before updating.');
      return;
    }

    formData.append(
      'data',
      JSON.stringify({
        journeyId: selectedJourney,
        communityName: data.communityName,
        communityDescription: data.communityDescription,
      })
    );

    addCommunity(formData, {
      onSuccess: () => {
        reset({
          communityName: '',
          communityDescription: '',
          communityIconImageDark: '',
          communityIconImageLight: '',
        });
      },
    });
  }

  return (
    <>
      <Heading>Add Community</Heading>
      <div className='flex flex-wrap items-center justify-center gap-12'>
        <Card className='m-3'>
          <CardHeader>
            <CardTitle>Add community icon</CardTitle>
            <CardDescription>
              You can add icons for the community.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-5 max-h-[70vh] overflow-scroll'>
              <div>
                <label htmlFor='communityIconDark' className='font-medium'>
                  Community Icon- Dark
                </label>
                <div className='flex flex-wrap items-center justify-around gap-5 my-3 md:flex-nowrap'>
                  <img src={darkImageURL} className='h-32 my-2' />
                  <div>
                    <Input
                      id='communityIconDark'
                      type='file'
                      onChange={handleDarkCommunityIconChange}
                    />
                    {darkImageError && (
                      <ErrorMessage>{darkImageError}</ErrorMessage>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor='communityIconLight' className='font-medium'>
                  Community Icon - Light
                </label>
                <div className='flex flex-wrap items-center justify-around gap-5 my-3 md:flex-nowrap'>
                  <img src={lightImageURL} className='h-32 my-2' />
                  <div>
                    <Input
                      id='communityIconLight'
                      type='file'
                      onChange={handleLightCommunityIconChange}
                    />
                    {lightImageError && (
                      <ErrorMessage>{lightImageError}</ErrorMessage>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
                  htmlFor='communityName'
                  hasContent={
                    providedName !== undefined && providedName?.length !== 0
                  }
                >
                  Community Name
                </InputFieldLabel>
                <Input
                  id='communityName'
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
                  id='communityDescription'
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
    </>
  );
};

export default AddCommunity;
