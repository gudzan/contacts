const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const EXPIRES_IN = "expiresIn";

export function setTokens(idToken, refreshToken, expiresIn) {
    localStorage.setItem(ACCESS_TOKEN, idToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    localStorage.setItem(EXPIRES_IN, new Date().getTime() + expiresIn * 1000);
}

export function getAccessToken() {
    localStorage.getItem(ACCESS_TOKEN);
}

export function getRefreshToken() {
    localStorage.getItem(REFRESH_TOKEN);
}

export function getExpiresIn() {
    localStorage.getItem(EXPIRES_IN);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getExpiresIn,
};

export default localStorageService;
