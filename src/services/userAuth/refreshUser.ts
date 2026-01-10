import { axiosInstance } from "../../constants";

// globally available refresh promise

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let refreshPromise: Promise<any> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function refreshToken(): Promise<{ success: boolean; accessToken: string; user: any }> {
    const response = await axiosInstance.get('/auth/refresh').then(res => res.data);
    return response;
}


export async function initiateRefresh() {
    if (!refreshPromise) {
        refreshPromise = refreshToken().then(res => { return res }).finally(() => refreshPromise = null);
    }
    return refreshPromise;

}