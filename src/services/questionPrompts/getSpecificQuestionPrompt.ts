import { axiosInstance } from '../../constants';
import { QuestionPrompt } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetSpecificQuestionPrompt(promptId: string) {
  const response = useQuery<QuestionPrompt>({
    queryKey: ['questionPrompt', promptId],
    queryFn: () =>
      axiosInstance
        .get(`/questionPrompts/get/${promptId}`)
        .then((res) => res.data.data),
  });
  return response;
}
