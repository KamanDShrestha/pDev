import useGetAllApplications from '../../services/qhpApplications/getAllApplications';
import Heading from '../../components/Heading';

import ApplicationCard from '../../components/ApplicationCard';

const Review = () => {
  const { data: applications } = useGetAllApplications();
  console.log(applications);

  return (
    <>
      <Heading>Review applications for QHPs</Heading>
      <div>
        {applications &&
          applications.map((application) => (
            <>
              <ApplicationCard
                application={application}
                key={application._id}
              />
            </>
          ))}
      </div>
    </>
  );
};

export default Review;
