import { NavLink } from 'react-router-dom';
import Heading from '../../components/Heading';
import { buttonVariants } from '../../components/ui/button';
import useGetPromptFeedbacks from '../../services/promptFeedbacks/getPromptFeedbacks';

import LoadingSpinner from '../../components/LoadingSpinner';
import PromptFeedbackCard from '../../components/PromptFeedbackCard';
import useDocumentTitle from '../../services/getTitle';

const FeedbacksForPrompts = () => {
  const { data: promptFeedbacks, isLoading } = useGetPromptFeedbacks();

  useDocumentTitle('Feedbacks - Question Prompts - SelfSync');
  return (
    <>
      <div className='flex flex-wrap justify-between'>
        <Heading>Feedbacks for journeys</Heading>
        <NavLink
          to={'/feedbacks'}
          className={buttonVariants({ variant: 'outline' })}
        >
          Find feedbacks for journeys
        </NavLink>
      </div>

      <div className='p-5'>
        <Heading>Pending feedbacks</Heading>
        {promptFeedbacks
          ?.filter((feedback) => feedback.feedbackStatus === 'pending')
          .map((feedback, index) => (
            <PromptFeedbackCard feedback={feedback} key={index} />
          ))}

        {isLoading && <LoadingSpinner />}
        {promptFeedbacks?.filter(
          (feedback) => feedback.feedbackStatus === 'pending'
        ).length === 0 && <p>No pending feedbacks for question prompts</p>}
      </div>
      <div className='p-5'>
        <Heading>Resolved feedbacks</Heading>
        {promptFeedbacks
          ?.filter((feedback) => feedback.feedbackStatus === 'resolved')
          .map((feedback, index) => (
            <PromptFeedbackCard feedback={feedback} key={index} />
          ))}

        {isLoading && <LoadingSpinner />}
        {promptFeedbacks?.filter(
          (feedback) => feedback.feedbackStatus === 'resolved'
        ).length === 0 && <p>No resolved feedbacks for question prompts</p>}
      </div>
      <div className='p-5'>
        <Heading>Rejected feedbacks</Heading>
        {promptFeedbacks
          ?.filter((feedback) => feedback.feedbackStatus === 'rejected')
          .map((feedback, index) => (
            <PromptFeedbackCard feedback={feedback} key={index} />
          ))}

        {isLoading && <LoadingSpinner />}
        {promptFeedbacks?.filter(
          (feedback) => feedback.feedbackStatus === 'rejected'
        ).length === 0 && <p>No rejected feedbacks for question prompts</p>}
      </div>
    </>
  );
};

export default FeedbacksForPrompts;
