import axios from "axios";

export const configureRefreshAccessTokenInterceptor = () => {
    axios.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {

                // originalRequest._retry = true;
                const refreshToken = localStorage.getItem('refreshToken');

                return axios.post('/api/login/refresh', { token: refreshToken })
                    .then(res => {
                        if (res.status === 200) {
                            localStorage.setItem('accessToken', res.data.token);
                            localStorage.setItem('refreshToken', res.data.refreshToken.token);
                            localStorage.setItem('refreshTokenExpiration', res.data.refreshToken.expiration);
                            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                            originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
                            return axios(originalRequest);
                        }
                        if (res.status === 400) {
                            // clear the access token
                            // clear the refresh token
                            // clear the refresh token expiry date
                            // set the authenticated state in redux to false
                            // prevent subsequent authorized requests
                        }
                    });
            }
            return Promise.reject(error);
        });
};