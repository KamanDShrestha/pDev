import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetSavedContents(userId: string) {
  const response = useQuery({
    queryKey: ['savedContents', userId],
    queryFn: () =>
      axiosInstance
        .get(`/savedContent/get/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
