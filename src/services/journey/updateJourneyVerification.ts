import toast from 'react-hot-toast';
import { axiosInstance } from '../../constants';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types';

const useUpdateJourneyVerification = () => {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: string) =>
      axiosInstance
        .post('/journey/verify', { journeyId: data })
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries(['journeys']);
      toast.success('The journey has been verified successfully.');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error.response?.data.message || 'An error occurred');
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });
  return response;
};

export default useUpdateJourneyVerification;
