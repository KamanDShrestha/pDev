import { axiosInstance } from '../../constants';
import { DeleteQuoteData, ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useDeleteQuote() {
  const response = useMutation({
    mutationFn: (data: DeleteQuoteData) =>
      axiosInstance
        .delete(`/quotes/delete/${data.category}/${data.quoteId}`)
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
