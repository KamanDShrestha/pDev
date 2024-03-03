import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import ErrorMessage from './ErrorMessage';
import { Input } from './ui/input';
import { JourneyData } from '../types';
import { Button, buttonVariants } from './ui/button';
import { cn } from '../lib/utils';
import useUpdateJourneyIcon from '../services/journey/updateJourneyIcon';

const UpdateJourneyIconDialog = ({ journey }: { journey: JourneyData }) => {
  const [lightImage, setLightImage] = useState<File | null>(null);
  const [darkImage, setDarkImage] = useState<File | null>(null);
  const [lightImageURL, setLightImageURL] = useState<string>(
    journey.imageLinks.light
  );
  const [darkImageURL, setDarkImageURL] = useState<string>(
    journey.imageLinks.dark
  );
  const [lightImageError, setLightImageError] = useState<string | null>(null);
  const [darkImageError, setDarkImageError] = useState<string | null>(null);

  const { mutate: updateIcon, isLoading: isUpdating } = useUpdateJourneyIcon();

  function handleLightJourneyIconChange(
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

  function handleDarkJourneyIconChange(e: React.ChangeEvent<HTMLInputElement>) {
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

  function handleJourneyIconDarkUpdate() {
    const formData = new FormData();

    if (darkImage) {
      formData.append('journeyIcon', darkImage);
      setLightImageError(null);
    } else {
      setDarkImageError('Please provide an image before updating.');
      return;
    }

    formData.append(
      'data',
      JSON.stringify({ journeyId: journey._id, iconType: 'dark' })
    );

    updateIcon(formData);
  }

  function handleJourneyIconLightUpdate() {
    const formData = new FormData();

    if (lightImage) {
      formData.append('journeyIcon', lightImage);
      setLightImageError(null);
    } else {
      setLightImageError('Please provide an image before updating.');
      return;
    }
    formData.append(
      'data',
      JSON.stringify({ journeyId: journey._id, iconType: 'light' })
    );
    updateIcon(formData);
  }
  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({ variant: 'secondary' }))}>
        Update Journey icon
      </DialogTrigger>
      <DialogContent className='m-3'>
        <DialogHeader>
          <DialogTitle>Update Journey icon</DialogTitle>
          <DialogDescription>
            You can update icons for the Journey.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-5 max-h-[70vh] overflow-scroll'>
          <div>
            <label htmlFor='JourneyIconDark' className='font-medium'>
              Journey Icon- Dark
            </label>
            <div className='flex flex-wrap items-center justify-around gap-5 my-3 md:flex-nowrap'>
              <img src={darkImageURL} className='h-32 my-2' />
              <div>
                <Input
                  id='JourneyIconDark'
                  type='file'
                  onChange={handleDarkJourneyIconChange}
                />
                {darkImageError && (
                  <ErrorMessage>{darkImageError}</ErrorMessage>
                )}
              </div>
            </div>
            <Button onClick={handleJourneyIconDarkUpdate} disabled={isUpdating}>
              Update dark-themed icon
            </Button>
          </div>
          <div>
            <label htmlFor='JourneyIconLight' className='font-medium'>
              Journey Icon - Light
            </label>
            <div className='flex flex-wrap items-center justify-around gap-5 my-3 md:flex-nowrap'>
              <img src={lightImageURL} className='h-32 my-2' />
              <div>
                <Input
                  id='JourneyIconLight'
                  type='file'
                  onChange={handleLightJourneyIconChange}
                />
                {lightImageError && (
                  <ErrorMessage>{lightImageError}</ErrorMessage>
                )}
              </div>
            </div>
            <Button
              onClick={handleJourneyIconLightUpdate}
              disabled={isUpdating}
            >
              Update light-themed icon
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateJourneyIconDialog;
