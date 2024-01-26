import { GetGratitudePromptsData } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetPrompts() {
  const response = useQuery<GetGratitudePromptsData[]>({
    queryKey: ['prompts'],
    queryFn: () =>
      axiosInstance
        .get('/gratitudeJournalPrompts/get')
        .then((res) => res.data.data),
  });
  return response;
}
