import { axiosInstance } from "../../constants";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function refreshToken(): Promise<{ success: boolean; accessToken: string; user: any }> {
    const response = await axiosInstance.get('/auth/refresh').then(res => res.data);
    return response;
}