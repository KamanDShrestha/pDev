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

const Review = () => {
  const { data: applications } = useGetAllApplications();

  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  console.log(applications);

  function handleSetOpen(userId: string) {
    if (open) {
      setOpen(false);
      console.log('will remove the params');
      setSearchParams({});
    } else {
      setOpen(true);
      setSearchParams({ userId });
      console.log('will add the params');
    }
  }
  return (
    <>
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
              <CardFooter>
                <Dialog
                  open={open}
                  onOpenChange={() => handleSetOpen(application.userId)}
                >
                  <DialogTrigger className='text-sm hover:underline'>
                    View additional details
                  </DialogTrigger>
                  <DialogContent>
                    <ApplicationDetails />
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
      </div>
    </>
  );
};

export default Review;
