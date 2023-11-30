import toast from 'react-hot-toast';
import { axiosInstance } from '../../constants';
import { DeleteUserData, ErrorResponse } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

function useDeleteUser() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: DeleteUserData) =>
      axiosInstance.delete(`/users/delete/${data.id}`).then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
      queryClient.invalidateQueries(['users']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || 'An error occurred');
    },
  });
  return response;
}

export default useDeleteUser;
