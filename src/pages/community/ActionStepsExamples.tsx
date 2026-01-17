import Heading from "@/src/components/Heading"
import LoadingSpinner from "@/src/components/LoadingSpinner"
import { Card, CardHeader, CardTitle } from "@/src/components/ui/card"
import { useParams } from "react-router-dom"
import useGetSpecificJourney from "../../services/journey/getSpecificJourney"

const ActionStepsExamples = () => {
  const { id } = useParams()
  const { data: journey, isLoading: isFetching } = useGetSpecificJourney({ id })
  console.log(journey)

  return (
    <>
      <Heading>
        Examples for <span>{isFetching ? <LoadingSpinner /> : journey?.name}</span> action steps
      </Heading>
      <div className="flex flex-wrap items-center justify-center gap-10">
        {journey?.actionSteps &&
          Object.keys(journey.actionSteps).map((key) => (
            <>
              {journey?.actionSteps[key].example && (
                <div>
                  <Card className="max-w-[600px]">
                    <CardHeader>
                      <CardTitle>{`Day ${key.split("day")[1]}`}</CardTitle>
                    </CardHeader>
                    <CardHeader className="whitespace-pre-wrap">{journey?.actionSteps[key].example}</CardHeader>
                  </Card>
                </div>
              )}
            </>
          ))}
      </div>
    </>
  )
}

export default ActionStepsExamples
