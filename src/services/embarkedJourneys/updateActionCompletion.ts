import { axiosInstance } from '../../constants';
import { UpdateActionCompletionData } from '../../types';
import { useMutation } from '@tanstack/react-query';

export default function useUpdateActionCompletion() {
  const response = useMutation({
    mutationFn: (data: UpdateActionCompletionData) =>
      axiosInstance.post('/progress/updateActionStepCompletion', data),
  });
  return response;
}
