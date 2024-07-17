import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';
import useGetUsersLiking from '../services/posts/getUsersLiking';
import LoadingSpinner from './LoadingSpinner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';

const ViewLikesDialog = ({ postId }: { postId: string }) => {
  const { user } = useAuthContext();
  const { data: usersLiking, isLoading: isFetchingUsersLiking } =
    useGetUsersLiking(postId);
  console.log(usersLiking);
  const navigate = useNavigate();
  return (
    <>
      {isFetchingUsersLiking && <LoadingSpinner />}
      <Dialog>
        <DialogTrigger className='cursor-pointer hover:underline'>
          {usersLiking && usersLiking.length > 0
            ? usersLiking.length === 1
              ? '1 like'
              : `${usersLiking.length} likes`
            : 'No likes'}
        </DialogTrigger>
        <DialogContent className='overflow-y-scroll max-h-[60vh]'>
          <DialogHeader>
            <DialogTitle>Likes</DialogTitle>
          </DialogHeader>
          <div>
            <div className='flex flex-col gap-3'>
              {usersLiking &&
                usersLiking.map((likes) => (
                  <>
                    {likes.userName && (
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div
                            style={{
                              backgroundImage: `url(${likes.userProfile})`,
                            }}
                            className='w-20 h-20 bg-cover rounded-full'
                          ></div>
                          <span className='font-semibold'>
                            {likes.userName}
                          </span>
                        </div>
                        {user?.id === likes.userId ? (
                          <Button
                            variant={'link'}
                            size={'sm'}
                            onClick={() => navigate('/profile')}
                          >
                            View Profile
                          </Button>
                        ) : (
                          <Button variant={'outline'}>Ping</Button>
                        )}
                      </div>
                    )}
                  </>
                ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewLikesDialog;
