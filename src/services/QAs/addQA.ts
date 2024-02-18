import { axiosInstance } from '../../constants';
import { AddQAData, ErrorResponse } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useAddQA() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: AddQAData) =>
      axiosInstance
        .post('/QAs/add/question', { QAField: data })
        .then((res) => res.data),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries(['QAs']);
      queryClient.invalidateQueries(['posts']);

      console.log(response);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occured');
      console.log(error);
    },
  });
  return response;
}
