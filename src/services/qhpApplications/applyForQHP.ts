import { axiosInstance } from '@/src/constants';
import { ApplyForQHPData } from '@/src/types';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function useApplyForQHP() {
  const response = useMutation({
    mutationFn: (data: ApplyForQHPData) =>
      axiosInstance.post('/qhpPost/apply', data).then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
  });
  return response;
}

export default useApplyForQHP;
