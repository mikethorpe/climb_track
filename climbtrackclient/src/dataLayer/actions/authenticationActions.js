import { useDispatch } from 'react-redux';
import { SET_AUTHENTICATED } from './types';

export const useSetAuthenticated = () => {
    const dispatch = useDispatch();

    return (authenticated) => {
        dispatch({ type: SET_AUTHENTICATED, payload: authenticated });
    };
};