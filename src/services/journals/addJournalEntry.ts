import { axiosInstance } from '../../constants';
import { AddJournalEntryData, ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export default function useAddJournalEntry() {
  const response = useMutation({
    mutationFn: (data: AddJournalEntryData) =>
      axiosInstance.post('/journals/add', data).then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || 'An error occurred');
    },
  });
  return response;
}
