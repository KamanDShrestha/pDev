import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';

export default function useContinueJourney() {
  const response = useMutation({
    mutationFn: (data: { userId: string; journeyId: string }) =>
      axiosInstance
        .patch('/progress/continueJourney', data)
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
    },
  });
  return response;
}
