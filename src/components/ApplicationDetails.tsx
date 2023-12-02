import React from 'react';
import { useSearchParams } from 'react-router-dom';

const ApplicationDetails = () => {
  const [searchParams] = useSearchParams();

  return <div>{searchParams.get('userId')}</div>;
};

export default ApplicationDetails;
