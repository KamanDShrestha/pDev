import { axiosInstance } from '../../constants';
import { PromptFeedback } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetPromptFeedbacks() {
  const response = useQuery<PromptFeedback[]>({
    queryKey: ['promptFeedbacks'],
    queryFn: () =>
      axiosInstance.get('/promptFeedbacks/get').then((res) => res.data.data),
  });
  return response;
}
