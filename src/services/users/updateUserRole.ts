import { ErrorResponse, UpdateUserRoleData } from '../../types';
import { axiosInstance } from '../../constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

function useUpdateUserRole() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: UpdateUserRoleData) =>
      axiosInstance.patch('/users/role', data).then((res) => res.data),
    onSuccess: (response) => {
      toast.success(response.message);
      console.log(response);
      queryClient.invalidateQueries(['users']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    },
  });

  return response;
}

export default useUpdateUserRole;
