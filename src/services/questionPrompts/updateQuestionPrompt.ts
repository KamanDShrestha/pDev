import { axiosInstance } from '../../constants';
import { AddQuestionPromptData, ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useUpdateQuestionPrompt() {
  const response = useMutation({
    mutationFn: (data: {
      promptId: string;
      questionPrompt: AddQuestionPromptData;
    }) =>
      axiosInstance
        .patch(`/question_prompts/${data.promptId}`, data.questionPrompt)
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log('response', response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log('error', error);
      toast.error(error.response?.data.message || 'An error occured');
    },
  });
  return response;
}
