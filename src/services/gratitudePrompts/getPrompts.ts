import { GetGratitudePromptsData } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetPrompts() {
  const response = useQuery<GetGratitudePromptsData[]>({
    queryKey: ['graditudePrompts'],
    queryFn: () =>
      axiosInstance
        .get('/gratitude_journal_prompts')
        .then((res) => res.data.data),
  });
  return response;
}
