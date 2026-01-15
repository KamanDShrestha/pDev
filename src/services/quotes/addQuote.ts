import { axiosInstance } from '../../constants';
import { AddQuoteData, ErrorResponse } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useAddQuote() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: AddQuoteData) =>
      axiosInstance.post('/quotes', data).then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
      queryClient.invalidateQueries(['quotes']);
      queryClient.invalidateQueries(['quoteCategories']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      toast.error(error.response?.data.message || 'An error occured');
    },
  });
  return response;
}
