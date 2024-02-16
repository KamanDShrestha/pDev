import { FieldValues, useForm } from 'react-hook-form';
import { CommunityData } from '../types';
import { Button, buttonVariants } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import useEditCommunityDetails from '../services/community/editCommunityDetails';
import LoadingSpinner from './LoadingSpinner';
import { FaPen } from 'react-icons/fa';
import { Textarea } from './ui/textarea';

interface EditCommunityDialogProps {
  community: CommunityData;
}

const EditCommunityDialog = ({ community }: EditCommunityDialogProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      communityName: community.communityName,
      communityDescription: community.communityDescription,
      communityIconDark: community.communityIcon.dark,
      communityIconLight: community.communityIcon.light,
    },
  });
  const { mutate: updateCommunity, isLoading: isEditing } =
    useEditCommunityDetails();

  function handleCommunityEdit(data: FieldValues) {
    updateCommunity({
      communityId: community._id,
      communityFields: {
        communityName: data.communityName,
        communityDescription: data.communityDescription,
        communityIcon: {
          dark: data.communityIconDark,
          light: data.communityIconLight,
        },
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: 'secondary' })}>
        Edit the community
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Community</DialogTitle>
          <DialogDescription>
            You can edit the community details here.{' '}
          </DialogDescription>
        </DialogHeader>
        <div className='p-3 space-y-3'>
          <div>
            <label htmlFor='communityName'>Community Name</label>
            <Input
              id='communityName'
              {...register('communityName', {
                required: 'Community name is required',
                minLength: {
                  value: 4,
                  message:
                    'Community name should be at least 3 characters long',
                },
              })}
            />
          </div>
          <div>
            <label htmlFor='communityDescription'>Community Description</label>
            <Textarea
              id='communityDescription'
              {...register('communityDescription', {
                required: 'Community Description is required',
                minLength: {
                  value: 20,
                  message:
                    'Community Description should be at least 20 characters long',
                },
              })}
            />
          </div>
          <div className='space-y-1'>
            <div>
              <label htmlFor='communityIconDark'>Community Icon- Dark</label>
              <Input
                id='communityIconDark'
                {...register('communityIconDark', {
                  required: 'Community Icon Dark is required',
                })}
              />
            </div>
            <div>
              <label htmlFor='communityIconLight'>Community Icon - Light</label>
              <Input
                id='communityIconLight'
                {...register('communityIconLight', {
                  required: 'Community Icon Light is required',
                })}
              />
            </div>
          </div>
        </div>
        <Button onClick={handleSubmit(handleCommunityEdit)}>
          {isEditing ? (
            <LoadingSpinner />
          ) : (
            <span className='flex items-center gap-2'>
              <span>Update</span>
              <FaPen />
            </span>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditCommunityDialog;
