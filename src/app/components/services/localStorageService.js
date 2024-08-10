const accessToken = "accessToken";
const refreshToken = "refreshToken";
const expiresIn = "expiresIn";

export function setTokens(idToken, refreshToken, expiresIn) {
    localStorage.setItem(accessToken, idToken);
    localStorage.setItem(refreshToken, refreshToken);
    localStorage.setItem(expiresIn, new Date().getTime() + expiresIn * 1000);
}

export function getAccessToken() {
    localStorage.getItem(accessToken);
}

export function getRefreshToken() {
    localStorage.getItem(refreshToken);
}

export function getExpiresIn() {
    localStorage.getItem(expiresIn);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getExpiresIn,
};

export default localStorageService;
