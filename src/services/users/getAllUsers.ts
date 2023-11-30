import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

function useGetAllUsers() {
  const response = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      axiosInstance.get('/users/getAll').then((res) => res.data.users),
  });
  return response;
}

export default useGetAllUsers;
