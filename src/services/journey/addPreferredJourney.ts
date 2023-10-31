import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';

export default function useAddPreferredJourney() {
  const navigate = useNavigate();
  const response = useMutation({
    mutationFn: (data: string) =>
      axiosInstance
        .post('/journey/addPreferredJourney', { preferredJourney: data })
        .then((response) => response.data),
    onSuccess: (response) => {
      console.log(response);
      navigate('/home');
    },
  });
  return response;
}
