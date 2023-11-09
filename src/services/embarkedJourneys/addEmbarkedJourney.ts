import { AddEmbarkedJourneyData } from '../../types';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';

export default function useAddEmbarkedJourney() {
  const response = useMutation({
    mutationFn: (data: AddEmbarkedJourneyData) =>
      axiosInstance.post('/progress/add', data),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => console.log(error),
  });
  return response;
}
