import { axiosInstance } from '../../constants';
import { DeleteGratitudeJournalData, ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useDeleteGratitudeJournalEntry() {
  const response = useMutation({
    mutationFn: (data: DeleteGratitudeJournalData) =>
      axiosInstance
        .delete(`/gratitude_journals/${data.userId}/${data.entryId}`)
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occurred');
      console.log(error);
    },
  });
  return response;
}
