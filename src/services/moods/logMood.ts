import toast from 'react-hot-toast';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse, LogMoodData } from '../../types';

function useLogMood() {
  const response = useMutation({
    mutationFn: (data: LogMoodData) =>
      axiosInstance.post('/moods/log', data).then((response) => response.data),
    onSuccess: (response) => {
      console.log('response', response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log('error', error);
      toast.error(error.response?.data.message || 'An error occured.');
    },
  });
  return response;
}

export default useLogMood;
