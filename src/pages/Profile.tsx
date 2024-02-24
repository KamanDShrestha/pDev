import { useAuthContext } from '../context/AuthProvider';
import Heading from '../components/Heading';
import useGetSavedContents from '../services/savedContent/getSavedContents';
import LoadingSpinner from '../components/LoadingSpinner';
import LearningVideoCard from '../components/LearningVideoCard';
import LearningPodcastCard from '../components/LearningPodcastCard';
import PostCard from '../components/PostCard';

import QuestionAnswerCard from '../components/QuestionAnswerCard';
import useDocumentTitle from '../services/getTitle';
import { format } from 'date-fns';
import { Badge } from '../components/ui/badge';
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
import useGetQhpDetails from '../services/qhpDetails/getQhpDetails';
const Profile = () => {
  const { user } = useAuthContext();
  console.log(user);

  const { data: userDetails, isLoading: isFetchingUserDetails } =
    useGetSpecificUser(user?.id as string);
  console.log(userDetails);
  const { data: qhpDetails, isLoading: isFetchingQhpDetails } =
    useGetQhpDetails(user?.id as string);
  console.log(qhpDetails);

  const { data: savedContents, isLoading: isFetchingSavedContents } =
    useGetSavedContents(user?.id as string);
  console.log(savedContents);

  useDocumentTitle('Profile - SelfSync');

  function handleDeletePost(postId: string) {
    console.log(postId);
  }
  return (
    <>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-wrap items-center justify-around gap-5'>
          <div>
            <span style={{ fontSize: '200px' }}>👦🏻</span>
          </div>
          <div>
            <Heading>Personal Details</Heading>
            {user && <ProfilePersonalDetailsCard />}
          </div>
        </div>
        <div>
          {user && user.role === 'qha' && (
            <>
              <Heading>Professional Details</Heading>

              <div className='flex items-center justify-center'>
                {qhpDetails && (
                  <Card className='max-w-[600px]'>
                    <CardHeader>
                      <CardTitle>Details regarding professional life</CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-3'>
                      <div className='flex justify-between'>
                        <label className='font-medium'>Working License: </label>
                        <span>{qhpDetails.workingLicense}</span>
                      </div>
                      <div className='flex justify-between'>
                        <label className='font-medium'>Working as: </label>
                        <span>{qhpDetails.jobTitle}</span>
                      </div>
                      <div className='flex justify-between'>
                        <label className='font-medium'>Working at: </label>
                        <span>{qhpDetails.employerName}</span>
                      </div>
                      <div>
                        <label className='font-medium'>
                          Relevant qualifications:
                        </label>
                        {qhpDetails.qualifications.length === 0 &&
                          'No relevant qualifications are provided.'}
                        {qhpDetails.qualifications.map(
                          (qualification, index) => (
                            <p key={index} className='flex'>
                              <span>
                                <LucideDot />
                              </span>
                              <span>{qualification}</span>
                            </p>
                          )
                        )}
                      </div>
                      <div>
                        <label className='font-medium'>
                          Relevant experiences:
                        </label>
                        {qhpDetails.experiences.length === 0 &&
                          'No relevant experiences are provided.'}
                        {qhpDetails.experiences.map((experience, index) => (
                          <p key={index} className='flex'>
                            <span>
                              <LucideDot />
                            </span>
                            <span>{experience}</span>
                          </p>
                        ))}
                      </div>
                      <div>
                        <label className='font-medium'>
                          Proficient fields:
                        </label>
                        {qhpDetails.proficientFields.length === 0 &&
                          'No relevant experiences are provided.'}
                        {qhpDetails.proficientFields.map(
                          (proficientField, index) => (
                            <p key={index} className='flex'>
                              <span>
                                <LucideDot />
                              </span>
                              <span>{proficientField}</span>
                            </p>
                          )
                        )}
                      </div>
                      <div>
                        <label className='font-medium'>
                          Additional Skills:
                        </label>
                        {qhpDetails.additionalSkills.length === 0 &&
                          'No relevant experiences are provided.'}
                        {qhpDetails.additionalSkills.map(
                          (additionalSkill, index) => (
                            <p key={index} className='flex'>
                              <span>
                                <LucideDot />
                              </span>
                              <span>{additionalSkill}</span>
                            </p>
                          )
                        )}
                      </div>
                      <div>
                        <label className='font-medium'>Additional info:</label>
                        <p className='px-7'>
                          {qhpDetails.additionalInformation}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}
        </div>
        <div>
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
        </div>
      </div>

      <Separator className='my-5' />
      <div>
        <Heading>Saved contents</Heading>
        {isFetchingSavedContents && <LoadingSpinner />}
        {savedContents && (
          <>
            <div className='p-3'>
              <Heading className='text-xl'>Saved videos</Heading>
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
            </div>

            <div className='p-3'>
              <Heading className='text-xl'>Saved podcasts</Heading>
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
            </div>

            <div className='p-3'>
              <Heading className='text-xl'>Saved posts</Heading>
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
            </div>
            <div className='p-3'>
              <Heading className='text-lg'>Saved QAs</Heading>
              {savedContents.qas.length === 0 && <p>No saved QAs</p>}
              <div className='flex flex-wrap justify-center gap-5 p-3'>
                {savedContents.qas.length > 0 &&
                  savedContents.qas.map((question, index) => (
                    <QuestionAnswerCard question={question} key={index} />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
