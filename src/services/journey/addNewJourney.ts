import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';

type JourneyData = {
  name: string;
  description: string;
  length: number;
  imageLinks: { dark: string; light: string };
  importance: string[];
  learningQuotes: string[];
  usages: string[];
  actionSteps: object;
};

export function useAddNewJourney() {
  const response = useMutation({
    mutationFn: (data: JourneyData) =>
      axiosInstance
        .post('/journey/addNewJourney', data)
        .then((response) => response.data),
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => console.log(error),
  });

  return response;
}
