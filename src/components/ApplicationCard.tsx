import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import ApplicationDetails from './ApplicationDetails';
import { Button } from './ui/button';
import { ApplicationData } from '../types';
import { useSearchParams } from 'react-router-dom';
import useUpdateApplicationStatus from '../services/qhpApplications/updateApplicationStatus';
import useUpdateUserRole from '../services/users/updateUserRole';
import useAddQhpDetails from '../services/qhpDetails/addQhpDetails';

interface ApplicationCardProps {
  application: ApplicationData;
}

const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const { mutate: updateStatus } = useUpdateApplicationStatus();
  const { mutate: updateUserRole } = useUpdateUserRole();
  const { mutate: addQhpDetails } = useAddQhpDetails();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  function handleSetOpen(userId: string) {
    if (open) {
      setOpen(false);
      setSearchParams({});
    } else {
      setOpen(true);
      setSearchParams({ userId });
    }
  }

  const statusColoring = {
    Pending: 'bg-yellow-100 text-yellow-500',
    Approved: 'bg-green-100 text-green-500',
    Rejected: 'bg-red-100 text-red-500',
  };

  function handleVerify(id: string, userId: string) {
    updateStatus(
      { id, status: 'Approved' },
      {
        onSuccess: () => {
          updateUserRole({ userId: userId, role: 'qha' });
          addQhpDetails({
            userId: userId,
            workingLicense: application.workingLicense,
            jobTitle: 'temp job',
            employerName: 'temp employer',
            qualifications: application.qualifications,
            additionalInformation: application.additionalInformation,
            experiences: application.experiences,
            proficientFields: application.proficientFields,
            additionalSkills: application.additionalSkills,
          });
        },
      }
    );
  }

  function handleReject(id: string, userId: string) {
    updateStatus(
      { id, status: 'Rejected' },
      {
        onSuccess: () => {
          updateUserRole({ userId: userId, role: 'user' });
        },
      }
    );
  }
  return (
    <Card className='max-w-[525px]'>
      <CardHeader>
        <CardTitle className='text-xl'>
          Application for user: {application.userId}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          <div>
            <span className='font-medium'>Provided license number: </span>
            {application.workingLicense}
          </div>
          <div>
            <span className='font-medium'>Current job position: </span>
            application.jobPosition
          </div>
          <div>
            <span className='font-medium'>Working at: </span>
            application.employer
          </div>
          <div>
            <span className='font-medium'>Qualifications: </span>
            {application.qualifications.map((qualification) => (
              <p>• {qualification}</p>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col items-start gap-4'>
        <div className='flex justify-between w-full'>
          <Dialog
            open={open}
            onOpenChange={() => handleSetOpen(application.userId)}
          >
            <DialogTrigger className='text-sm hover:underline'>
              View additional details
            </DialogTrigger>
            <DialogContent>
              <ApplicationDetails application={application} />
            </DialogContent>
          </Dialog>
          <span
            className={`px-4 py-2 text-xs ${
              statusColoring[application.status]
            } bg-red-100 rounded-full`}
          >
            {application.status}
          </span>
        </div>
        <div className='space-x-3'>
          {application.status !== 'Approved' && (
            <Button
              onClick={() => handleVerify(application._id, application.userId)}
            >
              Verify
            </Button>
          )}
          {application.status !== 'Rejected' && (
            <Button
              onClick={() => handleReject(application._id, application.userId)}
              variant={'destructive'}
            >
              Reject
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
