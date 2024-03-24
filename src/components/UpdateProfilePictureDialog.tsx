import { useState } from 'react';
import { useAuthContext } from '../context/AuthProvider';
import { cn } from '../lib/utils';
import { Button, buttonVariants } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import ErrorMessage from './ErrorMessage';
import useUpdateProfileImage from '../services/users/updateProfileImage';
import LoadingSpinner from './LoadingSpinner';

const UpdateProfilePictureDialog = ({
  previousImage,
}: {
  previousImage: string;
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(previousImage);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser } = useAuthContext();

  const { mutate: updateProfilePicture, isLoading: isUpdatingProfilePicture } =
    useUpdateProfileImage();

  function handleFileImage(e: React.ChangeEvent<HTMLInputElement>) {
    // checking if the image is provided or not
    setError(null);

    if (e.target.files) {
      if (e.target.files[0].type.split('/')[0] !== 'image') {
        setError('Please provide a valid image file');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result as string);
      };
      setImage(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function handleProfilePictureUpdate() {
    if (!image) {
      setError('Please provide an image before updating.');
      return;
    }

    if (image.type.split('/')[0] !== 'image') {
      setError('Please provide a valid image file');
    }

    const formData = new FormData();
    formData.append('userId', JSON.stringify(user?.id as string));
    formData.append('image', image);
    updateProfilePicture(formData, {
      onSuccess: () => {
        setUser && setUser((prevUser) => ({ ...prevUser, image: imageURL! }));
      },
    });
  }

  return (
    <Dialog onOpenChange={() => setImageURL(previousImage)}>
      <DialogTrigger className={cn(buttonVariants({ variant: 'default' }))}>
        Update profile picture
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update your profile picture</DialogTitle>
        </DialogHeader>
        <div className='m-auto'>
          <div
            style={{ backgroundImage: `url('${imageURL || previousImage}')` }}
            className='bg-cover rounded-full w-28 h-28'
          ></div>
        </div>
        <div>
          <Input type='file' onChange={handleFileImage} />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
        <div>
          <Button onClick={handleProfilePictureUpdate}>
            {isUpdatingProfilePicture ? (
              <LoadingSpinner />
            ) : (
              'Update profile picture'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfilePictureDialog;
