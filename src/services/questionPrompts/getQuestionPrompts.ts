import { QuestionPrompt } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetQuestionPrompts() {
  const response = useQuery<QuestionPrompt[]>({
    queryKey: ['questionPrompts'],
    queryFn: () =>
      axiosInstance.get('/questionPrompts/get').then((res) => res.data.data),
  });
  return response;
}
