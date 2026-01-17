import { axiosInstance } from '../../constants';
import { Mood } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetMoodsWithinRange(
  userId: string,
  startDate: Date,
  endDate: Date
) {
  const response = useQuery<Mood[]>({
    queryKey: ['moodsWithinRange', userId, startDate, endDate],
    queryFn: () =>
      axiosInstance
        .get(`/moods/sort/range/${userId}/${startDate}/${endDate}`)
        .then((res) => res.data.data),
  });
  return response;
}
