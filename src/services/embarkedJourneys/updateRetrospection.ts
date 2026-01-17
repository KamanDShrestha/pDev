import { axiosInstance } from '../../constants';
import { ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useUpdateRetrospection() {
  const response = useMutation({
    mutationFn: (data: {
      embarkedJourneyId: string;
      updatedFields: { reflection?: string; keyLearning?: string };
    }) =>
      axiosInstance
        .patch('/embarked_journeys/retrospection', data)
        .then((res) => res.data),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occurred');
      console.log(error);
    },
  });
  return response;
}
