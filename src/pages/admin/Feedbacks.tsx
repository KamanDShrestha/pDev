import Heading from "../../components/Heading"
import useGetJourneyFeedbacks from "../../services/journeyFeedbacks/getJourneyFeedbacks"
import FeedbackSection from "../../components/FeedbackSection"
import ActionStepFeedbackSection from "../../components/ActionStepFeedbackSection"
import { buttonVariants } from "../../components/ui/button"
import { NavLink } from "react-router-dom"
import useDocumentTitle from "../../services/getTitle"

const Feedbacks = () => {
  const { data: journeyFeedbacks, isLoading } = useGetJourneyFeedbacks()

  useDocumentTitle("Feedbacks - SelfSync")
  console.log(journeyFeedbacks)

  return (
    <>
      <div className="flex flex-wrap justify-between">
        <Heading>Feedbacks for journeys</Heading>
        <NavLink to={"/feedbacksForPrompts"} className={buttonVariants({ variant: "outline" })}>
          Find feedbacks for question prompts
        </NavLink>
      </div>

      <div className="p-5">
        <Heading className="text-3xl">Journey feedbacks</Heading>
        <FeedbackSection journeyFeedbacks={journeyFeedbacks!} status="pending" isLoading={isLoading} />
        <FeedbackSection journeyFeedbacks={journeyFeedbacks!} status="resolved" isLoading={isLoading} />
        <FeedbackSection journeyFeedbacks={journeyFeedbacks!} status="rejected" isLoading={isLoading} />
      </div>
      <div className="flex flex-col gap-3 p-5 mt-5">
        <Heading className="text-3xl">Action step feedbacks</Heading>
        <ActionStepFeedbackSection journeyFeedbacks={journeyFeedbacks!} status="pending" isLoading={isLoading} />
        <ActionStepFeedbackSection journeyFeedbacks={journeyFeedbacks!} status="resolved" isLoading={isLoading} />
        <ActionStepFeedbackSection journeyFeedbacks={journeyFeedbacks!} status="rejected" isLoading={isLoading} />
      </div>
    </>
  )
}

export default Feedbacks
