import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetQuestionPromptEntriesCount(userId: string) {
  const response = useQuery<number>({
    queryKey: ['questionPromptEntriesCount', userId],
    queryFn: () =>
      axiosInstance
        .get(`/question_prompt_entries/count/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
