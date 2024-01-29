import { QuestionPromptEntry } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetQuestionPromptEntries(userId: string) {
  const response = useQuery<QuestionPromptEntry[]>({
    queryKey: ['questionPromptEntries', userId],
    queryFn: () =>
      axiosInstance
        .get(`/questionPromptEntries/get/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
