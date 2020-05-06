import { useDispatch } from 'react-redux';
import axios from 'axios';
import { SET_AUTHENTICATED } from '../actions/types';

export const useConfigureRefreshAccessTokenInterceptor = () => {

    let isRefreshingAccessToken = false;
    let queuedRequests = [];

    // TODO: Handle storybook cases
    const dispatch = useDispatch();

    const removeJwtTokensFromLocalStorage = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('refreshTokenExpiration');
    };

    const removeAxiosAuthorizationHeader = () => {
        delete axios.defaults.headers.common['Authorization'];
    };

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
                    const refreshToken = localStorage.getItem('refreshToken');

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
                                localStorage.setItem('accessToken', res.data.token);
                                localStorage.setItem('refreshToken', res.data.refreshToken.token);
                                localStorage.setItem('refreshTokenExpiration', res.data.refreshToken.expiration);
                                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                                originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
                                isRefreshingAccessToken = false;
                                onAccessTokenFetched(`Bearer ${res.data.token}`);
                                // TODO: called the queued requests
                                return axios(originalRequest);
                            }
                        })
                        .catch((refreshError) => {
                            if (refreshError.response.status) {
                                removeJwtTokensFromLocalStorage();
                                removeAxiosAuthorizationHeader();
                                isRefreshingAccessToken = false;
                                dispatch({ type: SET_AUTHENTICATED, payload: false });
                            }
                            return null;
                        });
                }
                return Promise.reject(error);
            });
    };
};

