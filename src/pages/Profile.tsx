import { useAuthContext } from '../context/AuthProvider';
import Heading from '../components/Heading';
import useGetSavedContents from '../services/savedContent/getSavedContents';
import LoadingSpinner from '../components/LoadingSpinner';
import LearningVideoCard from '../components/LearningVideoCard';
import LearningPodcastCard from '../components/LearningPodcastCard';
import PostCard from '../components/PostCard';

import QuestionAnswerCard from '../components/QuestionAnswerCard';
import useDocumentTitle from '../services/getTitle';

const Profile = () => {
  const { user } = useAuthContext();
  console.log(user);
  const { data: savedContents, isLoading: isFetchingSavedContents } =
    useGetSavedContents(user?.id as string);
  console.log(savedContents);

  useDocumentTitle('Profile - SelfSync');

  function handleDeletePost(postId: string) {
    console.log(postId);
  }
  return (
    <>
      <div className='flex flex-wrap items-center justify-between gap-5'>
        <div>
          <span style={{ fontSize: '200px' }}>👦🏻</span>
        </div>
        <div>
          <Heading>Personal Details</Heading>
          <div>
            <div>
              <span>Name: </span>
              <span>{user?.firstName}</span>
            </div>
            <div>
              <span>Email: </span>
              <span>{user?.email}</span>
            </div>
          </div>
        </div>
      </div>
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
