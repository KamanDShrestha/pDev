import { useAuthContext } from '../context/AuthProvider';
import Heading from '../components/Heading';
import useGetSavedContents from '../services/savedContent/getSavedContents';
import LoadingSpinner from '../components/LoadingSpinner';
import LearningVideoCard from '../components/LearningVideoCard';
import LearningPodcastCard from '../components/LearningPodcastCard';
import PostCard from '../components/PostCard';

import QuestionAnswerCard from '../components/QuestionAnswerCard';
import useDocumentTitle from '../services/getTitle';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import ProfilePersonalDetailsCard from '../components/ProfilePersonalDetailsCard';
import { Separator } from '../components/ui/separator';
import useGetSpecificUser from '../services/users/getSpecificUser';
import { LucideDot } from 'lucide-react';

import EditPersonalDetailsDialog from '../components/EditPersonalDetailsDialog';
import ProfileProfessionalDetailsCard from '../components/ProfileProfessionalDetailsCard';
import EditProfessionalDetailsDialog from '../components/EditProfessionalDetailsDialog';
import EditAspirationDetailsDialog from '../components/EditAspirationDetailsDialog';
import UpdatePasswordDialog from '../components/UpdatePasswordDialog';
import UpdateProfilePictureDialog from '../components/UpdateProfilePictureDialog';
import useGetSpecificApplication from '../services/qhpApplications/getSpecificApplications';
import ApplicationCard from '../components/ApplicationCard';

const Profile = () => {
  const { user } = useAuthContext();
  console.log(user);

  console.log('profile image', user?.image);

  const { data: userDetails, isLoading: isFetchingUserDetails } =
    useGetSpecificUser(user?.id as string);
  console.log(userDetails);

  const { data: savedContents, isLoading: isFetchingSavedContents } =
    useGetSavedContents(user?.id as string);

  const {
    data: specificApplications,
    isLoading: isFetchingSpecificApplication,
  } = useGetSpecificApplication(user?.id as string);

  console.log(savedContents);

  useDocumentTitle('Profile - SelfSync');

  function handleDeletePost(postId: string) {
    console.log(postId);
  }
  return (
    <>
      <div className='flex flex-col gap-14'>
        <div className='flex flex-wrap items-center justify-center gap-5 md:justify-around '>
          <div>
            <div
              style={{
                backgroundImage: `url('${user?.image}')`,
              }}
              className='bg-cover rounded-full h-[200px] w-[200px]'
            ></div>
          </div>
          <div className='flex flex-col space-y-3'>
            <Heading>Personal Details</Heading>
            {user && <ProfilePersonalDetailsCard />}
            {user && (
              <div className='flex gap-3'>
                <EditPersonalDetailsDialog />
                <UpdatePasswordDialog />
                <UpdateProfilePictureDialog previousImage={user.image} />
              </div>
            )}
          </div>
        </div>
        <div className='space-y-3 '>
          {user && user.role === 'qhp' && (
            <>
              <Heading>Professional Details</Heading>
              <ProfileProfessionalDetailsCard />
              <div className='flex justify-center'>
                <EditProfessionalDetailsDialog />
              </div>
            </>
          )}
        </div>
        <div className='space-y-3'>
          <Heading>Aspirations details</Heading>
          {isFetchingUserDetails && <LoadingSpinner />}
          {userDetails && (
            <div className='flex flex-wrap justify-around gap-3'>
              <Card className='max-w-[350px]'>
                <CardHeader>
                  <CardTitle>Challenges to overcome</CardTitle>
                </CardHeader>
                <CardContent>
                  {userDetails.challenges.length === 0 &&
                    'No challenges to overcome are provided.'}
                  {userDetails.challenges.map((challenge, index) => (
                    <p key={index} className='flex'>
                      <span>
                        <LucideDot />
                      </span>
                      <span>{challenge}</span>
                    </p>
                  ))}
                </CardContent>
              </Card>
              <Card className='max-w-[350px]'>
                <CardHeader>
                  <CardTitle>Personal values</CardTitle>
                </CardHeader>
                <CardContent>
                  {userDetails.values.length === 0 &&
                    'No personal values are provided.'}
                  {userDetails.values.map((value, index) => (
                    <p key={index} className='flex'>
                      <span>
                        <LucideDot />
                      </span>
                      <span>{value}</span>
                    </p>
                  ))}
                </CardContent>
              </Card>
              <Card className='max-w-[350px]'>
                <CardHeader>
                  <CardTitle>Personal goals</CardTitle>
                </CardHeader>
                <CardContent>
                  {' '}
                  {userDetails.goals.length === 0 &&
                    'No personal goals are provided.'}
                  {userDetails.goals.map((goal, index) => (
                    <p key={index} className='flex'>
                      <span>
                        <LucideDot />
                      </span>
                      <span>{goal}</span>
                    </p>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
          <EditAspirationDetailsDialog />
        </div>
      </div>

      <Separator className='my-10' />

      {(user?.role === 'user' || user?.role === 'qhp') && (
        <>
          <div>
            <Heading>Applications for QHP</Heading>
            {isFetchingSpecificApplication && <LoadingSpinner />}
            <div className='flex flex-wrap items-center justify-around gap-5 p-3'>
              {specificApplications && specificApplications.length <= 0 ? (
                <p>You have not applied for Qualified Health Personnel role</p>
              ) : (
                specificApplications?.map((application, index) => (
                  <ApplicationCard application={application} key={index} />
                ))
              )}
            </div>
          </div>

          <Separator className='my-10' />
        </>
      )}

      <div>
        <Heading>Saved contents</Heading>
        {isFetchingSavedContents && <LoadingSpinner />}
        {savedContents && (
          <>
            <div className='p-3'>
              <Heading className='text-2xl'>Saved videos</Heading>
              {savedContents.videos.length === 0 && <p>No saved videos</p>}
              <div className='flex flex-wrap justify-center gap-5 p-3'>
                {savedContents.videos.length > 0 &&
                  savedContents.videos.map((video, index) => (
                    <LearningVideoCard
                      video={video}
                      key={index}
                      videoCategory={video.videoCategory}
                    />
                  ))}
              </div>
              <Separator className='my-10' />
            </div>

            <div className='p-3'>
              <Heading className='text-2xl'>Saved podcasts</Heading>

              {savedContents.podcasts.length === 0 && <p>No saved podcasts</p>}
              <div className='flex flex-wrap justify-center gap-5 p-3'>
                {savedContents.podcasts.length > 0 &&
                  savedContents.podcasts.map((podcast, index) => (
                    <LearningPodcastCard
                      podcast={podcast}
                      key={index}
                      podcastCategory={podcast.podcastCategory}
                    />
                  ))}
              </div>
              <Separator className='my-10' />
            </div>

            <div className='p-3'>
              <Heading className='text-2xl'>Saved posts</Heading>

              {savedContents.posts.length === 0 && <p>No saved posts</p>}
              <div className='flex flex-wrap justify-center gap-5 p-3'>
                {savedContents.posts.length > 0 &&
                  savedContents.posts.map((post, index) => (
                    <PostCard
                      post={post}
                      onDeletePost={handleDeletePost}
                      key={index}
                    />
                  ))}
              </div>
              <Separator className='my-10' />
            </div>
            <div className='p-3'>
              <Heading className='text-2xl'>Saved QAs</Heading>

              {savedContents.qas.length === 0 && <p>No saved QAs</p>}
              <div className='flex flex-wrap justify-center gap-5 p-3'>
                {savedContents.qas.length > 0 &&
                  savedContents.qas.map((question, index) => (
                    <QuestionAnswerCard question={question} key={index} />
                  ))}
              </div>
              <Separator className='my-10' />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
