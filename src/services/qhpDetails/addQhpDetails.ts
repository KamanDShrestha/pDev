import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../constants';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { ErrorResponse, QhpDetails } from '../../types';

export default function useAddQhpDetails() {
  const response = useMutation({
    mutationFn: (data: QhpDetails) =>
      axiosInstance
        .post('/qhps/add', { qhpDetails: data })
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      toast.error(error.response?.data.message || 'An error occured');
    },
  });
  return response;
}
