import { axiosInstance } from '../../constants';
import { UpdateUserDetailsData } from '../../types';
import { useMutation } from '@tanstack/react-query';

export default function useUpdateUserDetails() {
  const response = useMutation({
    mutationFn: (data: UpdateUserDetailsData) =>
      axiosInstance.patch('/users/updateDetails', data).then((res) => res.data),
  });
  return response;
}
