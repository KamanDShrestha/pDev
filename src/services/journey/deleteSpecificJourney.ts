import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../constants';
import { DeleteJourneyData, ErrorResponse } from '../../types';
import { AxiosError } from 'axios';

function useDeleteSpecificJourney() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: DeleteJourneyData) =>
      axiosInstance
        .delete(`/journeys/delete/${data.id}`)
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
      queryClient.invalidateQueries(['journeys']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || 'An error occurred');
    },
  });
  return response;
}

export default useDeleteSpecificJourney;
