import axios from "axios";

export const configureRefreshAccessTokenInterceptor = () => {
    axios.interceptors.response.use(
        (response) => {
            return response
        },
        function (error) {
            const originalRequest = error.config;

            // if (error.response.status === 401) {
            //     router.push('/login');
            //     return Promise.reject(error);
            // }

            if (error.response.status === 401) {

                // originalRequest._retry = true;
                const refreshToken = localStorage.getItem('refreshToken');
                axios.post('/api/login/refresh', { emailAddress: 'climber@climber.com', token: refreshToken })
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
            }
            return Promise.reject(error);
        });
};