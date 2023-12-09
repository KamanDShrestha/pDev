import { FieldValues, useForm } from 'react-hook-form';
import { Input } from '../../components/ui/input';
import useGetSpecificJourneyByID from '../../services/journey/getSpecificJourneyByID';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Heading from '../../components/Heading';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import useEditJourney from '../../services/journey/editJourney';

const EditJourneyPage = () => {
  const { id } = useParams();

  const { data: journey, isLoading } = useGetSpecificJourneyByID(id as string);

  const { register, reset, getValues, handleSubmit } = useForm({
    defaultValues: {
      name: journey?.name ?? '',
      description: journey?.description ?? '',
      light: journey?.imageLinks.light,
      dark: journey?.imageLinks.dark,
      importance: journey?.importance ?? [],
      usages: journey?.usages ?? [],
      learningQuotes: journey?.learningQuotes ?? [],
      actionSteps: journey?.actionSteps,
    },
  });
  const { mutate } = useEditJourney();

  useEffect(() => {
    if (journey) {
      reset({
        name: journey.name,
        description: journey.description,
        light: journey.imageLinks.light,
        dark: journey.imageLinks.dark,
        importance: journey.importance || [],
        usages: journey.usages || [],
        learningQuotes: journey.learningQuotes || [],
        actionSteps: journey.actionSteps || {},
      });
    }
  }, [journey, reset]);
  console.log(getValues());
  console.log(journey);

  function onSubmit(data: FieldValues) {
    console.log(data);
    mutate({
      _id: id as string,
      name: data.name,
      description: data.description,
      imageLinks: {
        light: data.light,
        dark: data.dark,
      },
      importance: data.importance,
      usages: data.usages,
      learningQuotes: data.learningQuotes,
      actionSteps: data.actionSteps,
      length: journey?.length as number,
    });
  }
  return (
    <>
      <Heading>Edit the journey</Heading>
      {isLoading && <p>Loading</p>}

      {journey && (
        <div className='space-y-5'>
          <div className='flex flex-wrap justify-around gap-5'>
            <div>
              <div>
                <Heading className='mb-2 text-2xl'>Journey Name</Heading>
                <Input {...register('name')} className='text-lg w-[300px]' />
              </div>
              <div>
                <Heading className='mb-2 text-2xl'>Journey Description</Heading>
                <Textarea
                  {...register('description')}
                  className='text-lg h-[200px] w-[450px]'
                />
              </div>
            </div>
            <div>
              <Heading className='mb-2 text-2xl'>
                Length of the journey: {journey.length}
              </Heading>
            </div>
          </div>
          <div>
            <Heading className='mb-2 text-2xl'>Image links</Heading>
            <div>
              <Heading className='mb-2 text-xl'>Light Mode</Heading>
              <Input {...register('light')} className='text-lg w-[80vw]' />
            </div>
            <div>
              <Heading className='mb-2 text-xl'>Dark Mode</Heading>
              <Input {...register('dark')} className='text-lg w-[80vw]' />
            </div>
          </div>
          <div className='flex flex-wrap justify-around gap-5'>
            <div>
              <Heading className='mb-2 text-2xl'>Importance</Heading>
              {journey.importance.length !== 0 ? (
                <>
                  {journey.importance.map((item, index) => (
                    <Input
                      {...register(`importance.${index}`)}
                      defaultValue={item}
                      key={index}
                      className='mb-2 text-lg w-[500px]'
                    />
                  ))}
                </>
              ) : (
                <>
                  {Array.from(Array(3).keys()).map((item, index) => (
                    <Input
                      {...register(`importance.${index}`)}
                      key={index}
                      className='mb-2 text-lg w-[500px]'
                    />
                  ))}
                </>
              )}
            </div>
            <div>
              <Heading className='mb-2 text-2xl'>Usages</Heading>
              {journey.usages.length !== 0 ? (
                <>
                  {journey.usages.map((item, index) => (
                    <Input
                      {...register(`usages.${index}`)}
                      defaultValue={item}
                      key={index}
                      className='mb-2 text-lg w-[500px]'
                    />
                  ))}
                </>
              ) : (
                <>
                  {Array.from(Array(3).keys()).map((item, index) => (
                    <Input
                      {...register(`usages.${index}`)}
                      defaultValue={item}
                      key={index}
                      className='mb-2 text-lg w-[500px]'
                    />
                  ))}
                </>
              )}
            </div>
            <div>
              <Heading className='mb-2 text-2xl'>Learning Quotes</Heading>
              {journey.learningQuotes.length !== 0 ? (
                <>
                  {journey.learningQuotes.map((item, index) => (
                    <Input
                      {...register(`learningQuotes.${index}`)}
                      defaultValue={item}
                      key={index}
                      className='mb-2 text-lg w-[500px]'
                    />
                  ))}
                </>
              ) : (
                <>
                  {Array.from(Array(3).keys()).map((item, index) => (
                    <Input
                      {...register(`learningQuotes.${index}`)}
                      key={index}
                      className='mb-2 text-lg w-[500px]'
                    />
                  ))}
                </>
              )}
            </div>
          </div>
          <div>
            <Heading className='mb-2 text-2xl'>Action Steps</Heading>
            <div className='flex flex-wrap justify-center gap-5'>
              {Array.from(Array(journey.length)).map((item, index) => (
                <>
                  <Card className='p-5'>
                    <Heading className='mb-2 text-xl'>
                      Action Steps for Day {index + 1}
                    </Heading>

                    <div>
                      <Heading className='mb-1 text-lg'>
                        Major Action Step
                      </Heading>
                      <Input
                        {...register(`actionSteps.day${index + 1}.actionStep`)}
                        defaultValue={
                          journey.actionSteps[`day${index + 1}`].actionStep
                        }
                      />
                    </div>
                    <div>
                      <Heading className='mb-1 text-lg'>Description</Heading>
                      <Textarea
                        {...register(`actionSteps.day${index + 1}.description`)}
                        className=' h-[100px] w-[450px]'
                      />
                    </div>
                    <Dialog>
                      <DialogTrigger>
                        <p className='mt-3 text-xs font-medium hover:underline text-slate-600'>
                          Make additional changes
                        </p>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className='text-xl'>
                            Make changes in additional steps and evidences !
                          </DialogTitle>
                        </DialogHeader>
                        <div>
                          <Heading className='mt-1 mb-1 text-lg'>
                            Additional Steps
                          </Heading>
                          <div className='space-y-2'>
                            {Array.from(Array(3).keys()).map(
                              (item, thisIndex) => (
                                <Input
                                  {...register(
                                    `actionSteps.day${
                                      index + 1
                                    }.additionalSteps[${thisIndex}]`
                                  )}
                                  value={
                                    journey.actionSteps[`day${index + 1}`]
                                      .additionalSteps[thisIndex]
                                  }
                                />
                              )
                            )}
                          </div>
                        </div>
                        <div>
                          <Heading className='mt-1 mb-1 text-lg'>
                            Evidences
                          </Heading>
                          <div className='space-y-2'>
                            {Array.from(Array(3).keys()).map(
                              (item, thisIndex) => (
                                <Input
                                  {...register(
                                    `actionSteps.day${
                                      index + 1
                                    }.evidences[${thisIndex}]`
                                  )}
                                  value={
                                    journey.actionSteps[`day${index + 1}`]
                                      .evidences[thisIndex]
                                  }
                                />
                              )
                            )}
                          </div>
                        </div>
                        <p className='text-xs text-slate-400'>
                          Close for temporarily saving the changes!
                        </p>
                      </DialogContent>
                    </Dialog>
                  </Card>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
      <Button onClick={handleSubmit(onSubmit)}>Update the journey</Button>
    </>
  );
};

export default EditJourneyPage;
