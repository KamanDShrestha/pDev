import { Skeleton } from '../../components/ui/skeleton';
import { Checkbox } from '../../components/ui/checkbox';
import { useAuthContext } from '../../context/AuthProvider';
import useGetEmbarkedJourney from '../../services/embarkedJourneys/getEmbarkedJourney';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import useUpdateActionCompletion from '../../services/embarkedJourneys/updateActionCompletion';
import { useQueryClient } from '@tanstack/react-query';

const CurrentJourney = () => {
  const { user } = useAuthContext();
  const journeyId = useParams();
  const { data, isLoading, error } = useGetEmbarkedJourney(
    user?.id as string,
    journeyId?.id as string
  );

  console.log(error);
  const { mutate } = useUpdateActionCompletion();
  const queryClient = useQueryClient();
  const [selectedJourneyDay, setSelectedJourneyDay] = useState(1);
  const [isActionStepChecked, setIsActionStepChecked] = useState(false);

  function handleConfirmActionStepCompletion(day: string) {
    mutate(
      {
        journeyId: journeyId?.id as string,
        day: day,
        userId: user?.id as string,
      },
      {
        onSuccess: () => {
          console.log('Action step completion updated successfully');
          queryClient.invalidateQueries({
            queryKey: ['embarkedJourney', user?.id, journeyId.id],
          });
        },
      }
    );
  }

  console.log('current Journey', data);
  return (
    <div>
      <div className='w-screen h-[80vh] bg-gray-200'>
        Placeholder for quotes for current journey
      </div>

      <div className='p-4'>
        <h2 className='mt-2 mb-5 text-4xl font-semibold'>
          Today's action step
        </h2>

        <div className='text-xl font-medium'>
          {/* getting the action step in which the journey is ongoing as only one of the journey would be ongoing*/}
          {(data?.embarkedJourney &&
            data.embarkedJourney.actionSteps[
              Object.keys(data.embarkedJourney.actionSteps).filter(
                (day) =>
                  data.embarkedJourney?.actionSteps[day].status === 'ongoing'
              )[0]
            ]?.actionStep) ||
            'You have completed all the journey'}
        </div>
      </div>

      <div className='p-10'>
        <h2 className='mt-2 mb-5 text-4xl font-semibold'>Your journey</h2>
        <div>
          <div className='flex flex-col gap-8'>
            {isLoading &&
              Array.from(Array(7)).map((_, index) => (
                <div className='flex gap-4' key={index}>
                  <Skeleton className='w-8 h-8 rounded-full' />
                  <Skeleton className='w-[80vw] h-8' />
                </div>
              ))}
          </div>

          {data?.embarkedJourney &&
            Object.keys(data.embarkedJourney.actionSteps).map(
              (day: string, index) => (
                <div className='flex items-center gap-4 p-3 text-lg font-medium'>
                  <Dialog>
                    <DialogTrigger>
                      {data.embarkedJourney.actionSteps[day].status === 'due' ||
                      data.embarkedJourney.actionSteps[day].status ===
                        'ongoing' ? (
                        <Checkbox
                          defaultChecked={
                            data.embarkedJourney.actionSteps[day].isCompleted
                          }
                          checked={
                            data.embarkedJourney.actionSteps[day].isCompleted ||
                            isActionStepChecked
                          }
                          disabled={
                            data.embarkedJourney.actionSteps[day].isCompleted
                          }
                        />
                      ) : (
                        <Checkbox
                          disabled
                          checked={
                            data.embarkedJourney.actionSteps[day].isCompleted
                          }
                        />
                      )}
                    </DialogTrigger>
                    <DialogContent>
                      <div className='space-y-5'>
                        <h1 className='text-2xl font-semibold'>
                          Do you want to mark this day as completed?
                        </h1>
                        <div className='flex justify-between'>
                          <DialogClose>
                            <Button
                              onClick={() => setIsActionStepChecked(false)}
                            >
                              Cancel
                            </Button>
                          </DialogClose>
                          <DialogClose>
                            <Button
                              onClick={() =>
                                handleConfirmActionStepCompletion(day)
                              }
                            >
                              Confirm
                            </Button>
                          </DialogClose>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* modal dialog for providing details of action steps */}
                  <div
                    className='hover:cursor-pointer'
                    onClick={() => setSelectedJourneyDay(index + 1)}
                  >
                    <Dialog>
                      <DialogTrigger>
                        <span className='text-xl'>{`Day ${index + 1}`}</span>
                        <span> - </span>
                        {data.embarkedJourney.actionSteps[day].actionStep}
                      </DialogTrigger>

                      <DialogContent>
                        <div>
                          <h1 className='text-2xl font-semibold'>
                            Day {selectedJourneyDay}
                          </h1>
                          <span className='text-lg font-medium'>
                            Level up your day
                          </span>

                          <div>
                            <h2 className='text-xl font-semibold'>
                              Action step for the day
                            </h2>
                            <p>
                              {
                                data.embarkedJourney.actionSteps[
                                  `day${selectedJourneyDay}`
                                ].actionStep
                              }
                            </p>
                          </div>

                          <div>
                            <h2 className='text-xl font-semibold'>
                              Description
                            </h2>
                            <p>
                              {
                                data.embarkedJourney.actionSteps[
                                  `day${selectedJourneyDay}`
                                ].description
                              }
                            </p>
                          </div>
                          {data.embarkedJourney.actionSteps[
                            `day${selectedJourneyDay}`
                          ].additionalSteps && (
                            <div>
                              <h2 className='text-xl font-semibold'>
                                Additional Steps
                              </h2>
                              <p>
                                {data.embarkedJourney.actionSteps[
                                  `day${selectedJourneyDay}`
                                ].additionalSteps.map((step: string, index) => (
                                  <p key={index}>
                                    {index + 1}. {step}
                                  </p>
                                ))}
                              </p>
                            </div>
                          )}

                          {data.embarkedJourney.actionSteps[
                            `day${selectedJourneyDay}`
                          ].evidences && (
                            <div>
                              <h2 className='text-xl font-semibold'>
                                Evidences
                              </h2>
                              {data.embarkedJourney.actionSteps[
                                `day${selectedJourneyDay}`
                              ].evidences.map((link: string, index) => (
                                <p>
                                  <Link key={index} to={link} target='_blank'>
                                    {index + 1}. {link}
                                  </Link>
                                </p>
                              ))}
                            </div>
                          )}

                          {data.embarkedJourney.actionSteps[
                            `day${selectedJourneyDay}`
                          ].status === 'ongoing' && (
                            <div className='flex items-center gap-2'>
                              <Checkbox
                                defaultChecked={
                                  data.embarkedJourney.actionSteps[day]
                                    .isCompleted
                                }
                                checked={
                                  data.embarkedJourney.actionSteps[day]
                                    .isCompleted || isActionStepChecked
                                }
                                disabled={
                                  data.embarkedJourney.actionSteps[day]
                                    .isCompleted
                                }
                                onClick={() =>
                                  handleConfirmActionStepCompletion(day)
                                }
                              />
                              <span className='font-medium'>
                                Yay, I completed the action step for the day. 🎉
                              </span>
                            </div>
                          )}

                          {data.embarkedJourney.actionSteps[
                            `day${selectedJourneyDay}`
                          ].status === 'idle' && (
                            <span className='font-medium'>
                              I will surely complete this on the respective day.
                            </span>
                          )}

                          {data.embarkedJourney.actionSteps[
                            `day${selectedJourneyDay}`
                          ].status === 'blocked' && (
                            <span className='font-medium'>
                              Please complete previous days action steps to
                              unlock this day's action step.
                            </span>
                          )}

                          {data.embarkedJourney.actionSteps[
                            `day${selectedJourneyDay}`
                          ].status === 'due' && (
                            <span className='font-medium'>
                              Please complete this day to unlock the next day's
                              action step.
                            </span>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default CurrentJourney;
