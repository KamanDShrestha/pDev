import { AxiosError } from 'axios';
import { axiosInstance } from '../../constants';
import { ApplyingApplicationData, ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function useApplyForQHP() {
  const response = useMutation({
    mutationFn: (data: ApplyingApplicationData) =>
      axiosInstance
        .post('/qhpPost/apply', { application: data })
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });
  return response;
}

export default useApplyForQHP;
