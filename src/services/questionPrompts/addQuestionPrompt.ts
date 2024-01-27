import { AddQuestionPromptData } from '@/src/types';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';

export default function useAddQuestionPrompt() {
  const response = useMutation({
    mutationFn: (data: AddQuestionPromptData) =>
      axiosInstance.post('/questionPrompts/add', data).then((res) => res.data),
  });
  return response;
}
