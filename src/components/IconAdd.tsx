import React, { useState } from 'react';
import { Input } from './ui/input';
import ErrorMessage from './ErrorMessage';

interface IconAddProps {
  setLightImage: React.Dispatch<React.SetStateAction<File | null>>;
  setDarkImage: React.Dispatch<React.SetStateAction<File | null>>;
  setLightImageURL: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDarkImageURL: React.Dispatch<React.SetStateAction<string | undefined>>;
  lightImageURL: string | undefined;
  darkImageURL: string | undefined;
}

const IconAdd = ({
  setLightImage,
  setDarkImage,
  setDarkImageURL,
  setLightImageURL,
  lightImageURL,
  darkImageURL,
}: IconAddProps) => {
  const [lightImageError, setLightImageError] = useState<string | null>(null);
  const [darkImageError, setDarkImageError] = useState<string | null>(null);

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
  return (
    <>
      <div>
        <label htmlFor='communityIconDark' className='font-medium'>
          Icon - Dark
        </label>
        <div className='flex flex-wrap items-center justify-around gap-5 my-3 md:flex-nowrap'>
          <img
            src={darkImageURL ? darkImageURL : undefined}
            className='h-32 my-2'
          />
          <div>
            <Input
              id='communityIconDark'
              type='file'
              onChange={handleDarkCommunityIconChange}
            />
            {darkImageError && <ErrorMessage>{darkImageError}</ErrorMessage>}
          </div>
        </div>
      </div>
      <div>
        <label htmlFor='communityIconLight' className='font-medium'>
          Icon - Light
        </label>
        <div className='flex flex-wrap items-center justify-around gap-5 my-3 md:flex-nowrap'>
          <img src={lightImageURL} className='h-32 my-2' />
          <div>
            <Input
              id='communityIconLight'
              type='file'
              onChange={handleLightCommunityIconChange}
            />
            {lightImageError && <ErrorMessage>{lightImageError}</ErrorMessage>}
          </div>
        </div>
      </div>
    </>
  );
};

export default IconAdd;
