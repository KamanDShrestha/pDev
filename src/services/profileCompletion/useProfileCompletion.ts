import { ProfileCompletionData } from '../../types';
import { axiosInstance } from '../../constants/index';
import { useMutation } from '@tanstack/react-query';

export function useProfileCompletion() {
  const response = useMutation({
    mutationFn: (data: ProfileCompletionData) =>
      axiosInstance.post('/newUser', data).then((response) => response.data),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  return response;
}
