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

interface ApplicationCardProps {
  application: ApplicationData;
}

const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const { mutate: updateStatus } = useUpdateApplicationStatus();

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

  function handleVerify(id: string) {
    updateStatus({ id, status: 'Approved' });
  }

  function handleReject(id: string) {
    updateStatus({ id, status: 'Rejected' });
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
        <div className='space-x-3'>
          <Button onClick={() => handleVerify(application._id)}>Verify</Button>
          <Button
            onClick={() => handleReject(application._id)}
            variant={'destructive'}
          >
            Reject
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
