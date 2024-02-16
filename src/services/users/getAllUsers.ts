import { User } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

function useGetAllUsers(
  name: string | undefined,
  role: string | undefined,
  preferredJourney: string | undefined,

  limit: number,
  skip: number,
  field: string | undefined,
  direction: string | undefined
) {
  const response = useQuery<{ users: User[]; totalUsers: number }>({
    queryKey: [
      'users',
      name,
      role,
      preferredJourney,
      limit,
      skip,
      field,
      direction,
    ],
    queryFn: () =>
      axiosInstance
        .get('/users/getAll', {
          params: {
            name,
            role,
            preferredJourney,
            limit,
            skip,
            field,
            direction,
          },
        })
        .then((res) => res.data.data),
  });
  return response;
}

export default useGetAllUsers;
