import { AddJourneyData } from '../../types';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
export function useAddNewJourney() {
  const response = useMutation({
    mutationFn: (data: AddJourneyData) =>
      axiosInstance
        .post('/journey/addNewJourney', data)
        .then((response) => response.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success('Journey added successfully');
    },
    onError: (error) => {
      toast.error('Error in adding journey');
      console.log(error);
    },
  });

  return response;
}
