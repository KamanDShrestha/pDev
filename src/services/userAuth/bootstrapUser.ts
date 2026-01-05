import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../constants";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
let bootstrapPromise: Promise<{ success: boolean; accessToken: string; user: any }> | null = null;

export function useBootstrapUser(bootstrapToken: string) {
    const response = useQuery({
        enabled: !!bootstrapToken,
        queryFn: () => axiosInstance.get('/auth/bootstrap', {
            headers: {
                Authorization: `Bearer ${bootstrapToken}`
            }
        }).then(res => res.data)
    })
    return response;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function bootstrapUser(bootstrapToken: string): Promise<{ success: boolean; accessToken: string; user: any }> {
    const response = await axiosInstance.get('/auth/bootstrap', {
        headers: {
            Authorization: `Bearer ${bootstrapToken}`
        }
    }).then(res => res.data);
    return response;
}


export async function initializeBootstrap(bootstrapToken: string) {
    if (!bootstrapPromise) {
        bootstrapPromise = bootstrapUser(bootstrapToken).then(res => { return res }).finally(() => bootstrapPromise = null);
    }
    return bootstrapPromise;
}