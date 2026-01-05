import React, { useRef, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import InputFieldLabel from "../../components/InputFieldLabel"
import { Input } from "../../components/ui/input"
import ErrorMessage from "../../components/ErrorMessage"
import { Button } from "../../components/ui/button"
import ActionStep from "../../components/AddActionStep"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../components/ui/select"
import JourneyCard from "../../components/JourneyCard"
import { useAddNewJourney } from "../../services/journey/addNewJourney"
import { ActionSteps } from "../../types"
import useDocumentTitle from "../../services/getTitle"
import IconAdd from "../../components/IconAdd"
import LoadingSpinner from "../../components/LoadingSpinner"
import Heading from "../../components/Heading"

const AddJourneyPage = () => {
  const [lightImage, setLightImage] = useState<File | null>(null)
  const [darkImage, setDarkImage] = useState<File | null>(null)
  const [lightImageURL, setLightImageURL] = useState<string | undefined>()
  const [darkImageURL, setDarkImageURL] = useState<string | undefined>()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const actionStepsForm = useForm()
  const [numberOfActionSteps, setNumberOfActionSteps] = useState(10)
  const actionSteps: React.MutableRefObject<ActionSteps> = useRef({})
  const journeyImportance: React.MutableRefObject<string[]> = useRef([])
  const journeyQuotes: React.MutableRefObject<string[]> = useRef([])
  const journeyUsages: React.MutableRefObject<string[]> = useRef([])

  const providedName = watch("journeyName")
  const providedDescription = watch("journeyDescription")

  const { mutate, isLoading: isAddingJourney } = useAddNewJourney()

  useDocumentTitle("Add Journey - SelfSync")

  function handleJourneySubmit(data: FieldValues) {
    if (!(lightImage instanceof File)) {
      return
    }
    if (!(darkImage instanceof File)) {
      return
    }

    const formData = new FormData()

    journeyImportance.current = []
    journeyQuotes.current = []
    journeyUsages.current = []

    Array.from(Array(3)).map((_, index) => {
      if (data[`journeyImportance${index + 1}`] !== undefined && data[`journeyImportance${index + 1}`] !== "") {
        journeyImportance.current = [...journeyImportance.current, data[`journeyImportance${index + 1}`]]
      }

      if (data[`journeyQuote${index + 1}`] !== undefined && data[`journeyQuote${index + 1}`] !== "") {
        journeyQuotes.current = [...journeyQuotes.current, data[`journeyQuote${index + 1}`]]
      }

      if (data[`journeyUsage${index + 1}`] !== undefined && data[`journeyUsage${index + 1}`] !== "") {
        journeyUsages.current = [...journeyUsages.current, data[`journeyUsage${index + 1}`]]
      }
    })

    formData.append("darkIcon", darkImage)
    formData.append("lightIcon", darkImage)
    formData.append(
      "journeyDetails",
      JSON.stringify({
        name: providedName,
        description: providedDescription,
        length: numberOfActionSteps,

        importance: journeyImportance.current,
        learningQuotes: journeyQuotes.current,
        usages: journeyUsages.current,
        actionSteps: actionSteps.current,
      })
    )

    mutate(formData)
  }

  function handleSaveButton(data: FieldValues) {
    console.log(data)
    Array.from(Array(numberOfActionSteps)).map((_, index) => {
      Object.keys(data).forEach((key) => {
        if (key.includes(`day${index + 1}`) && data[key] !== undefined && data[key] !== "") {
          if (key === `day${index + 1}actionStep`) {
            const actionStep = data[key]
            actionSteps.current = {
              ...actionSteps.current,
              [`day${index + 1}`]: {
                ...actionSteps.current[`day${index + 1}`],
                actionStep,
              },
            }
            console.log(actionSteps.current)
          } else if (key === `day${index + 1}description`) {
            const description = data[key]
            actionSteps.current = {
              ...actionSteps.current,
              [`day${index + 1}`]: {
                ...actionSteps.current[`day${index + 1}`],
                description,
              },
            }
          } else if (key === `day${index + 1}evidence1` || key === `day${index + 1}evidence2` || key === `day${index + 1}evidence3`) {
            const evidence = data[key]
            if (actionSteps.current[`day${index + 1}`].evidences) {
              actionSteps.current = {
                ...actionSteps.current,
                [`day${index + 1}`]: {
                  ...actionSteps.current[`day${index + 1}`],
                  evidences: [...actionSteps.current[`day${index + 1}`].evidences, evidence],
                },
              }
            } else {
              actionSteps.current = {
                ...actionSteps.current,
                [`day${index + 1}`]: {
                  ...actionSteps.current[`day${index + 1}`],
                  evidences: [evidence],
                },
              }
            }
          } else if (key === `day${index + 1}additionalStep1` || key === `day${index + 1}additionalStep2` || (key === `day${index + 1}additionalStep3` && data[key] !== undefined && data[key] !== "")) {
            const additionalStep = data[key]
            if (actionSteps.current[`day${index + 1}`].additionalSteps) {
              actionSteps.current = {
                ...actionSteps.current,
                [`day${index + 1}`]: {
                  ...actionSteps.current[`day${index + 1}`],
                  additionalSteps: [...actionSteps.current[`day${index + 1}`].additionalSteps, additionalStep],
                },
              }
            } else {
              actionSteps.current = {
                ...actionSteps.current,
                [`day${index + 1}`]: {
                  ...actionSteps.current[`day${index + 1}`],
                  additionalSteps: [additionalStep],
                },
              }
            }
          } else if (key === `day${index + 1}example`) {
            const example = data[key]
            actionSteps.current = {
              ...actionSteps.current,
              [`day${index + 1}`]: {
                ...actionSteps.current[`day${index + 1}`],
                example,
              },
            }
          }
        }
      })
    })
  }

  return (
    <>
      <Heading>Add new journey</Heading>
      <div className="flex flex-col items-center justify-center w-screen min-h-screen gap-10 overflow-scroll">
        <div className="flex flex-col gap-2 mt-4">
          <h2 className="text-2xl font-semibold">Preview</h2>
          <JourneyCard
            journeyId="newJourney"
            journeyName={providedName}
            journeyDescription={providedDescription}
            journeyIcon={{
              dark: darkImageURL,
              light: lightImageURL,
            }}
            journeyLength={numberOfActionSteps}
            importance={journeyImportance.current}
            usages={journeyUsages.current}
          />
        </div>
        <div className="flex flex-wrap items-center justify-around gap-5">
          {/* <form onSubmit={handleSubmit(handleJourneySubmit)}> */}
          <form onSubmit={handleSubmit(handleJourneySubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Add new journey for the users !</CardTitle>
                <CardDescription>Through this, add new journeys for the users</CardDescription>
              </CardHeader>
              <CardContent className="overflow-scroll h-[600px]">
                <div className="flex flex-col gap-3">
                  <div className="relative group">
                    <InputFieldLabel htmlFor="journeyName" hasContent={providedName !== undefined && providedName?.length !== 0}>
                      Journey Name
                    </InputFieldLabel>
                    <Input
                      {...register("journeyName", {
                        required: "Journey name need to be provided",
                        minLength: {
                          value: 5,
                          message: "Journey name must have at least 5 characters",
                        },
                      })}
                      type="text"
                    />
                    {errors.journeyName && <ErrorMessage>{errors.journeyName.message as string}</ErrorMessage>}
                  </div>
                  <div className="relative group">
                    <InputFieldLabel htmlFor="journeyDescription" hasContent={providedDescription !== undefined && providedDescription?.length !== 0}>
                      Journey Description
                    </InputFieldLabel>
                    <Textarea
                      {...register("journeyDescription", {
                        required: "Description need to be provided",
                        minLength: {
                          value: 20,
                          message: "Description must have at least 20 characters",
                        },
                        maxLength: {
                          value: 500,
                          message: "Description must not have more than 500 characters",
                        },
                      })}
                    />
                    {errors.journeyDescription && <ErrorMessage>{errors.journeyDescription.message as string}</ErrorMessage>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="iconImageLinks" className="font-medium">
                      Icon Image Links
                    </label>
                    <IconAdd setDarkImage={setDarkImage} setLightImage={setLightImage} setDarkImageURL={setDarkImageURL} setLightImageURL={setLightImageURL} lightImageURL={lightImageURL} darkImageURL={darkImageURL} />
                  </div>

                  <div className="relative group">
                    <label htmlFor="journeyImportance" className="font-medium">
                      Journey Importance
                    </label>
                    <div className="relative flex flex-col gap-2">
                      {Array.from(Array(3)).map((_, index) => (
                        <React.Fragment key={index}>
                          <Input
                            key={index}
                            {...register(`journeyImportance${index + 1}`, {
                              required: "Please provide importance for this journey",
                            })}
                          />
                          {errors[`journeyImportance${index + 1}`] && <ErrorMessage>{errors[`journeyImportance${index + 1}`]?.message as string}</ErrorMessage>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="relative group">
                    <label htmlFor="journeyUsages" className="font-medium">
                      Journey Usages
                    </label>
                    <div className="relative flex flex-col gap-2 group">
                      {Array.from(Array(3)).map((_, index) => (
                        <React.Fragment key={index}>
                          <Input
                            key={index}
                            {...register(`journeyUsage${index + 1}`, {
                              required: "Please provide usages for this journey",
                            })}
                          />
                          {errors[`journeyUsage${index + 1}`] && <ErrorMessage>{errors[`journeyUsage${index + 1}`]?.message as string}</ErrorMessage>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="relative group">
                    <label htmlFor="journeyQuote" className="font-medium">
                      Journey Quotes
                    </label>
                    <div className="relative flex flex-col gap-2 group">
                      {Array.from(Array(3)).map((_, index) => (
                        <React.Fragment key={index}>
                          <Input
                            key={index}
                            {...register(`journeyQuote${index + 1}`, {
                              required: "Please provide quotes for this journey",
                            })}
                          />
                          {errors[`journeyQuote${index + 1}`] && <ErrorMessage>{errors[`journeyQuote${index + 1}`]?.message as string}</ErrorMessage>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="journeyLength" className="font-medium">
                      Select the length of journey
                    </label>
                    <Select onValueChange={(value) => setNumberOfActionSteps(parseInt(value))} defaultValue={numberOfActionSteps.toString()}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the length of journey" />
                      </SelectTrigger>
                      <SelectContent className="overflow-scroll">
                        <SelectGroup>
                          <SelectLabel>Length of the journey</SelectLabel>
                          {Array.from(Array(20)).map((_, index) => (
                            <React.Fragment key={index}>
                              <SelectItem value={(index + 10).toString()}>{index + 10}</SelectItem>
                            </React.Fragment>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled={isAddingJourney}>{isAddingJourney ? <LoadingSpinner /> : "Submit"}</Button>
              </CardFooter>
            </Card>
          </form>
          <Card>
            <CardHeader>
              <CardTitle>Add action steps for the journey</CardTitle>
            </CardHeader>
            <form onSubmit={actionStepsForm.handleSubmit(handleSaveButton)}>
              <CardContent className="flex flex-col gap-10 h-[550px] overflow-scroll md:w-[640px]">
                {Array.from(Array(numberOfActionSteps)).map((_, index) => (
                  <React.Fragment key={index}>
                    <ActionStep key={index} day={index + 1} register={actionStepsForm.register} errors={actionStepsForm.formState.errors} watch={actionStepsForm.watch} />
                  </React.Fragment>
                ))}
              </CardContent>
              <CardFooter>
                <Button>Save</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  )
}

export default AddJourneyPage
