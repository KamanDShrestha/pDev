import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../constants';
import { ApplicationData } from '@/src/types';

function useGetAllApplications() {
  const response = useQuery<ApplicationData[]>({
    queryKey: ['applications'],
    queryFn: () =>
      axiosInstance
        .get('/qhpPost/getApplications')
        .then((res) => res.data.applications),
  });
  return response;
}

export default useGetAllApplications;
