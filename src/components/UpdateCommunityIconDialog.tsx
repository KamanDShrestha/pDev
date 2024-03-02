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
import { CommunityData } from '../types';
import { Button, buttonVariants } from './ui/button';
import { cn } from '../lib/utils';
import useUpdateCommunityIcon from '../services/community/updateCommunityIcon';

const UpdateCommunityIconDialog = ({
  community,
}: {
  community: CommunityData;
}) => {
  const [lightImage, setLightImage] = useState<File | null>(null);
  const [darkImage, setDarkImage] = useState<File | null>(null);
  const [lightImageURL, setLightImageURL] = useState<string>(
    community.communityIcon.light
  );
  const [darkImageURL, setDarkImageURL] = useState<string>(
    community.communityIcon.dark
  );
  const [lightImageError, setLightImageError] = useState<string | null>(null);
  const [darkImageError, setDarkImageError] = useState<string | null>(null);

  const { mutate: updateIcon, isLoading: isUpdating } =
    useUpdateCommunityIcon();

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

  function handleCommunityIconDarkUpdate() {
    const formData = new FormData();

    if (darkImage) {
      formData.append('communityIcon', darkImage);
      setLightImageError(null);
    } else {
      setDarkImageError('Please provide an image before updating.');
      return;
    }

    formData.append(
      'data',
      JSON.stringify({ communityId: community._id, iconType: 'dark' })
    );

    updateIcon(formData);
  }

  function handleCommunityIconLightUpdate() {
    const formData = new FormData();

    if (lightImage) {
      formData.append('communityIcon', lightImage);
      setLightImageError(null);
    } else {
      setLightImageError('Please provide an image before updating.');
      return;
    }
    formData.append(
      'data',
      JSON.stringify({ communityId: community._id, iconType: 'light' })
    );
    updateIcon(formData);
  }
  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({ variant: 'secondary' }))}>
        Update community icon
      </DialogTrigger>
      <DialogContent className='m-3'>
        <DialogHeader>
          <DialogTitle>Update community icon</DialogTitle>
          <DialogDescription>
            You can update icons for the community.
          </DialogDescription>
        </DialogHeader>
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
            <Button
              onClick={handleCommunityIconDarkUpdate}
              disabled={isUpdating}
            >
              Update dark-themed icon
            </Button>
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
            <Button
              onClick={handleCommunityIconLightUpdate}
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

export default UpdateCommunityIconDialog;
