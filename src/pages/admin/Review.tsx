import useGetAllApplications from '../../services/qhpApplications/getAllApplications';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../components/ui/dialog';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import ApplicationDetails from '../../components/ApplicationDetails';
import { Button } from '../../components/ui/button';
import Heading from '../../components/Heading';
import useUpdateApplicationStatus from '../../services/qhpApplications/updateApplicationStatus';

const Review = () => {
  const { data: applications } = useGetAllApplications();
  const { mutate: updateStatus } = useUpdateApplicationStatus();

  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  console.log(applications);

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
    <>
      <Heading>Review applications for QHPs</Heading>
      <div>
        {applications &&
          applications.map((application) => (
            <Card className='max-w-[525px]'>
              <CardHeader>
                <CardTitle className='text-xl'>
                  Application for user: {application.userId}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  <div>
                    <span className='font-medium'>
                      Provided license number:{' '}
                    </span>
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
                  <Button onClick={() => handleVerify(application._id)}>
                    Verify
                  </Button>
                  <Button
                    onClick={() => handleReject(application._id)}
                    variant={'destructive'}
                  >
                    Reject
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    </>
  );
};

export default Review;
