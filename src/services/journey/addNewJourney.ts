import { AddJourneyData } from '../../types';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';

export function useAddNewJourney() {
  const response = useMutation({
    mutationFn: (data: AddJourneyData) =>
      axiosInstance
        .post('/journey/addNewJourney', data)
        .then((response) => response.data),
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => console.log(error),
  });

  return response;
}
