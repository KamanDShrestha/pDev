import { axiosInstance } from '../../constants';
import { ErrorResponse, UpdateApplicationStatusData } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useDiscardApplication() {
  const response = useMutation({
    mutationFn: (data: UpdateApplicationStatusData) =>
      axiosInstance
        .patch('/qhpPost/discardApplication', data)
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message || 'An error occured');
    },
  });
  return response;
}
