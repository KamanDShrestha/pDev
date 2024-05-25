import { useSearchParams } from 'react-router-dom';
import useGetSpecificUser from '../services/users/getSpecificUser';
import Heading from './Heading';
import { ApplicationData } from '../types';

interface ApplicationDetailsProps {
  application: ApplicationData;
}

const ApplicationDetails = ({ application }: ApplicationDetailsProps) => {
  const [searchParams] = useSearchParams();

  const { data: user } = useGetSpecificUser(searchParams.get('userId')!);

  return (
    <div>
      <Heading className='text-xl'>Applicant's details</Heading>
      {user && (
        <>
          <div>
            <span className='font-medium'>Applicant's name: </span>
            {user.firstName} {user.lastName}
          </div>
          <div>
            <span className='font-medium'>Applicant's email: </span>
            {user.email}
          </div>
          <div>
            <span className='font-medium'>
              {user.hasSubscribed
                ? 'Applicant has an active subscription.'
                : 'No active subscription is found.'}
            </span>
          </div>
          <div>
            <span className='font-medium'>Date of birth: </span>
            {user.dateOfBirth.split('T')[0]}
          </div>
          <div>
            <span className='font-medium'>Applicant's qualifications: </span>
            {application.qualifications.map((qualification) => (
              <p>• {qualification}</p>
            ))}
          </div>
          <div>
            <span className='font-medium'>Applicant's experiences: </span>
            {application.experiences.map((experience) => (
              <p>• {experience}</p>
            ))}
          </div>
          <div>
            <span className='font-medium'>Applicant's experiences: </span>
            {application.experiences.map((experience) => (
              <p>• {experience}</p>
            ))}
          </div>
          <div>
            <span className='font-medium'>Proficient Fields: </span>
            {application.proficientFields.map((field) => (
              <p>• {field}</p>
            ))}
          </div>
          <div>
            <span className='font-medium'>Additional skills: </span>
            {application.additionalSkills.map((skill) => (
              <p>• {skill}</p>
            ))}
          </div>
          <div>
            <span className='font-medium'>Additional info: </span>
            {application.additionalInformation}
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationDetails;
