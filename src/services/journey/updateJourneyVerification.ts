import { axiosInstance } from '../../constants';

import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateJourneyVerification = () => {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: string) =>
      axiosInstance
        .post('/journey/verify', { journeyId: data })
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries(['journeys']);
    },
  });
  return response;
};

export default useUpdateJourneyVerification;
