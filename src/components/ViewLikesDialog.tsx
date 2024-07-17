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
import useAddPingRequest from '../services/pingRequests/addPingRequest';
import useObtainPingStatus from '../services/pings/obtainPingStatus';
import UserLikesActionItem from './UserLikesActionItem';

const ViewLikesDialog = ({ postId }: { postId: string }) => {
  const { data: usersLiking, isLoading: isFetchingUsersLiking } =
    useGetUsersLiking(postId);

  return (
    <>
      {isFetchingUsersLiking && <LoadingSpinner />}
      <Dialog>
        {!isFetchingUsersLiking && (
          <DialogTrigger className='cursor-pointer hover:underline'>
            {usersLiking && usersLiking.length > 0
              ? usersLiking.length === 1
                ? '1 like'
                : `${usersLiking.length} likes`
              : 'No likes'}
          </DialogTrigger>
        )}
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
                        <UserLikesActionItem associatedUserId={likes.userId} />
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
