import { useAuthContext } from '../context/AuthProvider';
import Heading from '../components/Heading';
import useGetSavedContents from '../services/savedContent/getSavedContents';
import LoadingSpinner from '../components/LoadingSpinner';
import LearningVideoCard from '../components/LearningVideoCard';
import LearningPodcastCard from '../components/LearningPodcastCard';
import PostCard from '../components/PostCard';

import QuestionAnswerCard from '../components/QuestionAnswerCard';

const Profile = () => {
  const { user } = useAuthContext();
  console.log(user);
  const { data: savedContents, isLoading: isFetchingSavedContents } =
    useGetSavedContents(user?.id as string);
  console.log(savedContents);
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
            <div>
              <Heading className='text-lg'>Saved videos</Heading>
              {savedContents.videos.length === 0 && <p>No saved videos</p>}
              <div>
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

            <div>
              <Heading className='text-lg'>Saved podcasts</Heading>
              {savedContents.podcasts.length === 0 && <p>No saved podcasts</p>}
              <div>
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

            <div>
              <Heading className='text-lg'>Saved posts</Heading>
              {savedContents.posts.length === 0 && <p>No saved videos</p>}
              <div>
                {savedContents.posts.map((post, index) => (
                  <PostCard
                    post={post}
                    onDeletePost={handleDeletePost}
                    key={index}
                  />
                ))}
              </div>
            </div>
            <div>
              <Heading className='text-lg'>Saved QAs</Heading>
              {savedContents.qas.length === 0 && <p>No saved videos</p>}
              <div>
                {savedContents.qas.map((question, index) => (
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
