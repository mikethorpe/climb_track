import React, { useEffect } from 'react';
import { useConfigureRefreshAccessTokenInterceptor } from './interceptorHooks';

const Interceptor = () => {
    const configureRefreshAccessTokenInterceptor = useConfigureRefreshAccessTokenInterceptor();
    useEffect(() => {
        configureRefreshAccessTokenInterceptor();
    }, [])
    return null;
};

export default Interceptor;
