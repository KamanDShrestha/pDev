import useGetQhpDetails from '../services/qhpDetails/getQhpDetails';
import LoadingSpinner from './LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LucideDot } from 'lucide-react';
import { useAuthContext } from '../context/AuthProvider';

const ProfileProfessionalDetailsCard = () => {
  const { user } = useAuthContext();
  const { data: qhpDetails, isLoading: isFetchingQhpDetails } =
    useGetQhpDetails(user?.id as string);
  console.log(qhpDetails);
  return (
    <>
      {isFetchingQhpDetails && <LoadingSpinner />}
      <div className='flex items-center justify-center'>
        {qhpDetails && (
          <Card className='max-w-[600px]'>
            <CardHeader>
              <CardTitle>Details regarding professional life</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
              <div className='flex justify-between'>
                <label className='font-medium'>Working License: </label>
                <span>{qhpDetails.workingLicense}</span>
              </div>
              <div className='flex justify-between'>
                <label className='font-medium'>Working as: </label>
                <span>{qhpDetails.workingPosition}</span>
              </div>
              <div className='flex justify-between'>
                <label className='font-medium'>Working at: </label>
                <span>{qhpDetails.employerName}</span>
              </div>
              <div>
                <label className='font-medium'>Relevant qualifications:</label>
                {qhpDetails.qualifications.length === 0 &&
                  'No relevant qualifications are provided.'}
                {qhpDetails.qualifications.map((qualification, index) => (
                  <p key={index} className='flex'>
                    <span>
                      <LucideDot />
                    </span>
                    <span>{qualification}</span>
                  </p>
                ))}
              </div>
              <div>
                <label className='font-medium'>Relevant experiences:</label>
                {qhpDetails.experiences.length === 0 &&
                  'No relevant experiences are provided.'}
                {qhpDetails.experiences.map((experience, index) => (
                  <p key={index} className='flex'>
                    <span>
                      <LucideDot />
                    </span>
                    <span>{experience}</span>
                  </p>
                ))}
              </div>
              <div>
                <label className='font-medium'>Proficient fields:</label>
                {qhpDetails.proficientFields.length === 0 &&
                  'No relevant experiences are provided.'}
                {qhpDetails.proficientFields.map((proficientField, index) => (
                  <p key={index} className='flex'>
                    <span>
                      <LucideDot />
                    </span>
                    <span>{proficientField}</span>
                  </p>
                ))}
              </div>
              <div>
                <label className='font-medium'>Additional Skills:</label>
                {qhpDetails.additionalSkills.length === 0 &&
                  'No relevant experiences are provided.'}
                {qhpDetails.additionalSkills.map((additionalSkill, index) => (
                  <p key={index} className='flex'>
                    <span>
                      <LucideDot />
                    </span>
                    <span>{additionalSkill}</span>
                  </p>
                ))}
              </div>
              <div>
                <label className='font-medium'>Additional info:</label>
                <p className='px-7'>{qhpDetails.additionalInformation}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default ProfileProfessionalDetailsCard;
