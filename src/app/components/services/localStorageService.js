const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const EXPIRES_IN = "expiresIn";
const USER_ID = "userId";

export function setTokens(idToken, refreshToken, expiresIn, userId) {
    localStorage.setItem(ACCESS_TOKEN, idToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    localStorage.setItem(EXPIRES_IN, new Date().getTime() + expiresIn * 1000);
    localStorage.setItem(USER_ID, userId);
}

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
}

export function getExpiresIn() {
    return localStorage.getItem(EXPIRES_IN);
}

export function getUserId() {
    return localStorage.getItem(USER_ID);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getExpiresIn,
    getUserId
};

export default localStorageService;
