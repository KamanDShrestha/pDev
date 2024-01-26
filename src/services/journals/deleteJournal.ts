import { AxiosError } from 'axios';
import { axiosInstance } from '../../constants';
import { DeleteJournalData, ErrorResponse } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useDeleteJournal() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: DeleteJournalData) =>
      axiosInstance
        .delete(`/journals/delete/${data.userId}/${data.journalId}`)
        .then((res) => res.data),
    onSuccess: (response) => {
      toast.success(response.message);
      console.log(response);
      queryClient.invalidateQueries(['journals']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error.response?.data?.message || 'An error occurred');
      toast.error(error.response?.data?.message || 'An error occurred');
    },
  });
  return response;
}
