import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { JourneyFeedback } from "../types"
import Heading from "./Heading"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import { useUpdateJourneyFeedbackStatus } from "../services/journeyFeedbacks/updateJourneyFeedbackStatus"
import { statusColoring } from "../constants"
import { Badge } from "./ui/badge"

interface JourneyFeedbackCardProps {
  feedback: JourneyFeedback
  feedbackId: string
  userId: string
  journeyId: string
  userRole: string
}

const JourneyFeedbackCard = ({ feedback, feedbackId, userId, journeyId, userRole }: JourneyFeedbackCardProps) => {
  const { mutate: updateFeedbackStatus } = useUpdateJourneyFeedbackStatus()
  const navigate = useNavigate()

  function handleResolve() {
    updateFeedbackStatus({
      feedbackDocumentId: feedbackId,
      feedbackId: feedback._id,
      status: "resolved",
    })
  }
  function handleReject() {
    updateFeedbackStatus({
      feedbackDocumentId: feedbackId,
      feedbackId: feedback._id,
      status: "rejected",
    })
  }

  return (
    <Card className="max-w-[550px] ">
      <CardHeader>
        <CardTitle>Feedback</CardTitle>
        <div className="text-right">
          <Badge>{userRole === "qhp" ? "QHP Feedback" : "User Feedback"}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div>
          <Heading className="m-0 text-lg">Feedback from : {userId}</Heading>
          <Heading className="m-0 text-lg">Feedback for journey : {journeyId}</Heading>
        </div>
        <div>
          <>
            <Heading className="m-0 text-lg">Feedbacks for the journey:</Heading>
            <ul>
              <li className=" list-item">{feedback.feedback}</li>
            </ul>
          </>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {feedback.feedbackStatus === "pending" && (
          <div className="space-x-3">
            <>
              <Button onClick={() => handleResolve()}>Resolve</Button>
              <Button onClick={() => handleReject()}>Reject</Button>
              <Button onClick={() => navigate(`/journeys/edit/${journeyId}`)}>Act</Button>
            </>
          </div>
        )}
        <span className={`px-4 py-2 text-xs ${statusColoring[feedback.feedbackStatus as keyof typeof statusColoring]} rounded-full`}>{feedback.feedbackStatus}</span>
      </CardFooter>
    </Card>
  )
}

export default JourneyFeedbackCard
