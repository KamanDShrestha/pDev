import { FieldValues, useForm } from "react-hook-form"
import Heading from "./Heading"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

import { Textarea } from "./ui/textarea"
import useAddJourneyFeedback from "../services/journeyFeedbacks/addJourneyFeedback"
import { useAuthContext } from "../context/AuthProvider"
import { useState } from "react"
import ErrorMessage from "./ErrorMessage"
import { socket } from "../services/socket"

interface JourneyFeedbackProps {
  journeyId: string
}

const JourneyFeedback = ({ journeyId }: JourneyFeedbackProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const { user } = useAuthContext()
  const { mutate } = useAddJourneyFeedback()
  const [actionStepDayError, setActionStepDayError] = useState("")
  const [feedbackError, setFeedbackError] = useState("")

  function handleFeedbackSubmit(data: FieldValues) {
    console.log(data)
    if (!data.journeyFeedback && !data.actionStepDay) {
      setFeedbackError("Please provide feedback for the journey or action steps")
      return
    }

    if (data.actionStepDay && parseInt(data.actionStepDay) < 1) {
      setActionStepDayError("Day should be greater than 0")
      return
    }

    console.log(data)
    console.log(errors)

    if (data.journeyFeedback && data.actionStepDay && data.feedback) {
      mutate(
        {
          userId: user?.id as string,
          journeyId,
          journeyFeedbacks: { feedback: data.journeyFeedback || "" },
          actionStepFeedbacks: {
            actionStepDay: parseInt(data.actionStepDay || ""),
            feedback: data.feedback || "",
          },
          userRole: user?.role as string,
        },
        {
          onSuccess: () => {
            socket.emit("sendJourneyFeedbackNotification", {
              recipientRole: "admin",
              senderId: user?.id,
              senderName: user?.firstName,
              message: `${user?.firstName} added a new feedback for a journey.`,
              journeyId,
            })
            reset()
          },
        }
      )
    } else if (data.journeyFeedback) {
      mutate(
        {
          userId: user?.id as string,
          journeyId,
          journeyFeedbacks: { feedback: data.journeyFeedback || "" },
          userRole: user?.role as string,
        },
        {
          onSuccess: () => {
            reset()
          },
        }
      )
    } else if (data.actionStepDay && data.feedback) {
      console.log("here")
      mutate(
        {
          userId: user?.id as string,
          journeyId,
          actionStepFeedbacks: {
            actionStepDay: parseInt(data.actionStepDay),
            feedback: data.feedback || "",
          },
          userRole: user?.role as string,
        },
        {
          onSuccess: () => {
            reset()
          },
        }
      )
    } else {
      console.log("neighteebakc")

      return
    }
  }

  return (
    <div className="space-y-5">
      <Heading className="mb-0 text-xl">Provide appropriate feedbacks</Heading>
      <span className="text-xs text-gray-400">You can provide multiple feedbacks for both journey and action steps</span>
      <div>
        <Heading className="mb-2 text-lg">Feedback for the journey</Heading>
        <Textarea {...register("journeyFeedback")} />
        {feedbackError && <ErrorMessage>{feedbackError}</ErrorMessage>}
      </div>
      <div>
        <Heading className="mb-2 text-lg">
          Feedback for the action steps <span className="text-sm">(Optional)</span>
        </Heading>
        <div className="space-y-3">
          <div>
            <label className="font-medium">For this day </label>
            <Input {...register("actionStepDay")} type="number" onChange={() => setActionStepDayError("")} />
            {actionStepDayError && <ErrorMessage>{actionStepDayError}</ErrorMessage>}
          </div>
          <div>
            <label className="font-medium">Feedback </label>
            <Textarea {...register("feedback")} />
          </div>
        </div>
      </div>
      <Button onClick={handleSubmit(handleFeedbackSubmit)}>Submit</Button>
    </div>
  )
}

export default JourneyFeedback
