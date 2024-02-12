import useGetAllApplications from '../../services/qhpApplications/getAllApplications';
import Heading from '../../components/Heading';

import ApplicationCard from '../../components/ApplicationCard';
import useDocumentTitle from '../../services/getTitle';

const Review = () => {
  const { data: applications } = useGetAllApplications();
  console.log(applications);

  useDocumentTitle('Review Applications - SelfSync');

  return (
    <div className='space-y-20'>
      <div>
        <Heading>Review applications for QHPs</Heading>
        <div>
          {applications &&
          applications.filter((application) => application.status === 'Pending')
            .length === 0 ? (
            <p>No pending applications</p>
          ) : (
            applications?.map((application) => (
              <>
                {application.status === 'Pending' && (
                  <ApplicationCard
                    application={application}
                    key={application._id}
                  />
                )}
              </>
            ))
          )}
        </div>
      </div>
      <div>
        <Heading>Approved Applications</Heading>
        <div>
          {applications &&
          applications.filter(
            (application) => application.status === 'Approved'
          ).length === 0 ? (
            <p>No approved applications</p>
          ) : (
            applications?.map((application) => (
              <>
                {application.status === 'Approved' && (
                  <ApplicationCard
                    application={application}
                    key={application._id}
                  />
                )}
              </>
            ))
          )}
        </div>
      </div>
      <div>
        <Heading>Rejected Applications</Heading>
        <div>
          {applications &&
          applications.filter(
            (application) => application.status === 'Rejected'
          ).length === 0 ? (
            <p>No approved applications</p>
          ) : (
            applications?.map((application) => (
              <>
                {application.status === 'Rejected' && (
                  <ApplicationCard
                    application={application}
                    key={application._id}
                  />
                )}
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
