import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../constants";

export function useRefreshToken(refresh: boolean) {
    const response = useQuery({
        queryKey: ['refreshToken'],
        enabled: refresh,
        queryFn: () => axiosInstance.get('/auth/refresh').then(res => res.data)
    })
    return response;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function refreshToken(): Promise<{ success: boolean; accessToken: string; user: any }> {
    const response = await axiosInstance.get('/auth/refresh').then(res => res.data);
    return response;
}