import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const validJourneys = [
  'mindfulness',
  'mindset',
  'beatingProcrastination',
  'personalProductivity',
  'stoicism',
];

const SpecificJourney = () => {
  const params = useParams();
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  console.log(searchParams[0].get('id'));
  useEffect(() => {
    if (!validJourneys.includes(params.name as string)) {
      navigate('/journeyNotFound');
    }
  }, [navigate, params.name]);
  console.log(params);
  return <div>SpecificJourney</div>;
};

export default SpecificJourney;
