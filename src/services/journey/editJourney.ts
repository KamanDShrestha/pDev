import { axiosInstance } from '../../constants';
import { EditJourneyData, ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export default function useEditJourney() {
  const response = useMutation({
    mutationFn: (data: EditJourneyData) =>
      axiosInstance
        .patch(`/journeys/edit/${data._id}`, data)
        .then((res) => res.data),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occured');
    },
  });
  return response;
}
