import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';

export default function useAddPreferredJourney() {
  const response = useMutation({
    mutationFn: (data: string) =>
      axiosInstance
        .post('/journey/addPreferredJourney', { preferredJourney: data })
        .then((response) => response.data),
    onSuccess: (response) => console.log(response),
  });
  return response;
}
