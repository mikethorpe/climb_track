import { useDispatch } from 'react-redux';
import { SET_AUTHENTICATED } from './types';
import axios from 'axios';
import { getRefreshToken } from '../accessToken/accessTokenHelper';

export const useSetAuthenticated = () => {
    const dispatch = useDispatch();

    return (authenticated) => {
        dispatch({ type: SET_AUTHENTICATED, payload: authenticated });
    };
};

export const useRevokeRefreshToken = () => {
    return async () => {
        let token = getRefreshToken();
        await axios.post('/api/login/revoke', { token: token });
    }
};