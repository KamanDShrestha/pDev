import { axiosInstance } from '../../constants';
import { ErrorResponse, UpdateQuoteData } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useUpdateQuote() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: UpdateQuoteData) =>
      axiosInstance
        .patch(`/quotes/update/${data.category}/${data.quoteId}`, data.quote)
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
      queryClient.invalidateQueries(['quotes']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      toast.error(error.response?.data.message || 'An error occured.');
    },
  });
  return response;
}
