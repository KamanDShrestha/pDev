let accessToken: string | null = null;
let setTokenFn: ((t: string | null) => void) | null = null;

export function initTokenManager(setter: (t: string | null) => void) {
    setTokenFn = setter;
}

export function setAccessToken(token: string | null) {
    accessToken = token;
    setTokenFn?.(token);
}

export function getAccessToken() {
    return accessToken;
}