import axios from 'axios';

export const setAccessTokens = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

export const accessTokensExist = () => getAccessToken() && getRefreshToken();

export const getAccessToken = () => localStorage.getItem('accessToken');

export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const getAuthHeader = () => `Bearer ${getAccessToken()}`;

export const setAuthHeader = () => {
    const accessToken = getAccessToken();
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

export const clearAccessTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    removeAxiosAuthorizationHeader();
};

const removeAxiosAuthorizationHeader = () => {
    delete axios.defaults.headers.common['Authorization'];
};