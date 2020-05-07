import axios from 'axios';
import { useSetAuthenticated } from '../actions/authenticationActions';
import { setAccessTokens, getRefreshToken, clearAccessTokens, getAuthHeader } from '../accessToken/accessTokenHelper';

export const useConfigureRefreshAccessTokenInterceptor = () => {

    let isRefreshingAccessToken = false;
    let queuedRequests = [];

    // TODO: Handle storybook cases
    const setAuthenticated = useSetAuthenticated();

    function onAccessTokenFetched(authorizationHeader) {
        queuedRequests = queuedRequests.filter(callback => callback(authorizationHeader))
    }

    return () => {
        axios.interceptors.response.use(
            (response) => {
                return response
            },
            (error) => {
                const originalRequest = error.config;

                if (error.response.status === 401 && !originalRequest._retry) {
                    const refreshToken = getRefreshToken();

                    if (isRefreshingAccessToken) {
                        const retryOriginalRequest = new Promise((resolve) => {
                            queuedRequests.push((authorizationHeader) => {
                                originalRequest.headers.Authorization = authorizationHeader;
                                resolve(axios(originalRequest));
                            })
                        });
                        return retryOriginalRequest;
                    }

                    isRefreshingAccessToken = true;
                    return axios.post('/api/login/refresh', { token: refreshToken })
                        .then(res => {

                            if (res.status === 200) {
                                setAccessTokens(res.data.token, res.data.refreshToken.token);
                                const authHeader = getAuthHeader();
                                originalRequest.headers.Authorization = authHeader;
                                isRefreshingAccessToken = false;
                                onAccessTokenFetched(authHeader);
                                return axios(originalRequest);
                            }
                        })
                        .catch((refreshError) => {
                            if (refreshError.response.status) {
                                clearAccessTokens();
                                isRefreshingAccessToken = false;
                                setAuthenticated(false);
                            }
                            return null;
                        });
                }
                return Promise.reject(error);
            });
    };
};

