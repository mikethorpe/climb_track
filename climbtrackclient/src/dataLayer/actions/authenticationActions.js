import { useDispatch } from 'react-redux';
import { SET_AUTHENTICATED, SHOW_ERROR } from './types';
import axios from 'axios';
import { getRefreshToken, setAccessTokens } from '../accessToken/accessTokenHelper';

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

export function login(credentials){
    return (dispatch) => {
        axios
          .post('/api/login', credentials)
          .then(
            (response) => {
                  const { token, refreshToken} = response.data;
                  return dispatch(saveUserTokens({access: token, refresh: refreshToken.token}));
                  //history.replace(from);
            },
            (error) => dispatch(showError(error)))
          .catch((error) => dispatch(showError(error)))
    }
}

function saveUserTokens(tokens){
    const { access, refresh } = tokens
    setAccessTokens(access, refresh)
    return { type: SET_AUTHENTICATED, payload: true }
}

function showError(error){
    console.error(error.message)
    return { type: SHOW_ERROR, payload: error.message }
}