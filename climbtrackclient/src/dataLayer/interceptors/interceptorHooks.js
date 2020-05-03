import { useDispatch } from 'react-redux';
import axios from 'axios';
import { SET_AUTHENTICATED } from '../actions/types';

export const useConfigureRefreshAccessTokenInterceptor = () => {

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

    return () => {
        axios.interceptors.response.use(
            (response) => {
                return response
            },
            (error) => {
                const originalRequest = error.config;

                if (error.response.status === 401 && !originalRequest._retry) {
                    const refreshToken = localStorage.getItem('refreshToken');

                    return axios.post('/api/login/refresh', { token: refreshToken })
                        .then(res => {

                            if (res.status === 200) {
                                debugger;
                                localStorage.setItem('accessToken', res.data.token);
                                localStorage.setItem('refreshToken', res.data.refreshToken.token);
                                localStorage.setItem('refreshTokenExpiration', res.data.refreshToken.expiration);
                                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                                originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
                                return axios(originalRequest);
                            }
                        })
                        .catch((refreshError) => {
                            if (refreshError.response.status) {
                                debugger;
                                removeJwtTokensFromLocalStorage();
                                removeAxiosAuthorizationHeader();
                                dispatch({ type: SET_AUTHENTICATED, payload: false });
                            }
                        });
                }
                return Promise.reject(error);
            });
    };
};

