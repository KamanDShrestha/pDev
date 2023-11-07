import { AiTwotoneUpCircle } from 'react-icons/ai';
import InputFieldLabel from './InputFieldLabel';
import { Input } from './ui/input';
import ErrorMessage from './ErrorMessage';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { Textarea } from './ui/textarea';

interface ActionStepProps {
  day: number;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const AddActionStep = ({ day, register, errors, watch }: ActionStepProps) => {
  const providedActionStep = watch(`day${day}actionStep`);
  const providedDescription = watch(`day${day}description`);

  console.log(errors);
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-4'>
        <AiTwotoneUpCircle />
        <h2 className='text-xl font-semibold'>Day {day}</h2>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='relative group'>
          <InputFieldLabel
            htmlFor={`day${day}actionStep`}
            hasContent={
              providedActionStep !== undefined &&
              providedActionStep?.length !== 0
            }
          >
            Action Step
          </InputFieldLabel>
          <Input
            {...register(`day${day}actionStep`, {
              required: 'Action Step need to be provided',
              minLength: {
                value: 10,
                message: 'Action step must have 10 characters',
              },
            })}
            type='text'
          />
          {errors[`day${day}actionStep`] && (
            <ErrorMessage>
              {errors[`day${day}actionStep`]?.message as string}
            </ErrorMessage>
          )}
        </div>

        <div className='relative group'>
          <InputFieldLabel
            htmlFor={`day${day}description`}
            hasContent={
              providedDescription !== undefined &&
              providedDescription?.length !== 0
            }
          >
            Description
          </InputFieldLabel>
          <Textarea
            {...register(`day${day}description`, {
              required: 'Description need to be provided',
              minLength: {
                value: 20,
                message: 'Description must have at least 20 characters',
              },
              maxLength: {
                value: 300,
                message: 'Description must not have more than 300 characters',
              },
            })}
          />
          {errors[`day${day}description`] && (
            <ErrorMessage>
              {errors[`day${day}description`]?.message as string}
            </ErrorMessage>
          )}
        </div>
        <div className='relative flex flex-col gap-2 group'>
          <div>
            <label
              htmlFor={`${day}additionalActionSteps`}
              className='font-medium'
            >
              Additional Steps
            </label>
            <span className='text-xs'> {'(Optional)'}</span>
          </div>

          {Array.from(Array(3)).map((_, index) => (
            <>
              <Input
                key={index}
                {...register(`day${day}additionalStep${index + 1}`)}
              />
            </>
          ))}
          {/* {errors.journeyName && (
            <ErrorMessage>{errors.journeyName?.message as string}</ErrorMessage>
          )} */}
        </div>

        <div className='relative flex flex-col gap-2 group'>
          <label
            htmlFor={`${day}additionalActionSteps`}
            className='font-medium'
          >
            Evidences and further Learnings
          </label>

          {Array.from(Array(3)).map((_, index) => (
            <>
              <Input
                key={index}
                {...register(`day${day}evidence${index + 1}`)}
              />
            </>
          ))}
          {/* {errors.journeyName && (
            <ErrorMessage>{errors.journeyName?.message as string}</ErrorMessage>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default AddActionStep;
