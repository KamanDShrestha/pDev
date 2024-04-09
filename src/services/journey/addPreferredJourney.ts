import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
export default function useAddPreferredJourney() {
  const navigate = useNavigate();
  const response = useMutation({
    mutationFn: (data: string) =>
      axiosInstance
        .patch('/journeys/addPreferredJourney', { preferredJourney: data })
        .then((response) => response.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success('Your preferred journey has been added successfully');

      navigate('/home');
    },
  });
  return response;
}
