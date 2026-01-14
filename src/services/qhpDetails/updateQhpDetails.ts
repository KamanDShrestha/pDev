import { axiosInstance } from '../../constants';
import { ErrorResponse, UpdateQhpDetailsData } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useUpdateQhpDetails() {
  const response = useMutation({
    mutationFn: (data: UpdateQhpDetailsData) =>
      axiosInstance.patch('/qhps', data).then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(error);
      toast.error(error.response?.data.message || 'An error occured');
    },
  });
  return response;
}
