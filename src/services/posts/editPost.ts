import { axiosInstance } from '../../constants';
import { ErrorResponse, PostData } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import toast from 'react-hot-toast';

export default function useEditPost() {
  const response = useMutation({
    mutationFn: (data: { postId: string; postEditFields: PostData }) =>
      axiosInstance.patch('/posts/edit', data).then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      toast.error(
        (error.response?.data.message as string) || 'An error occurred.'
      );
    },
  });
  return response;
}
