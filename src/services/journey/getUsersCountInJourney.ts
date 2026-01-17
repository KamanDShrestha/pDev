import { axiosInstance } from '../../constants';
import { UsersCountInJourney } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetUsersCountInJourney() {
  const response = useQuery<UsersCountInJourney>({
    queryKey: ['usersCountInJourney'],
    queryFn: () =>
      axiosInstance
        .get('/journeys/embarked_users/count')
        .then((res) => res.data.data),
  });
  return response;
}
