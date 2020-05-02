import { useDispatch } from 'react-redux';
import axios from 'axios';
import { CREATE_CLIMBING_SESSION, SET_CLIMBING_SESSIONS } from './types';
import mockApi from '../mockApi/mockApi';

export const useCreateClimbingSession = () => {
    const dispatch = useDispatch();
    return async (climbingSession) => {
        if (process.env.STORYBOOK_MODE) {
            dispatch({ type: CREATE_CLIMBING_SESSION, payload: climbingSession });
            return;
        }
        const postResponse = await axios.post('/api/climbingsession', climbingSession);
        // if (postResponse.data.status === 401) {
        //     console.log('refreshing access token');
        //     let refreshToken = localStorage.getItem('refreshToken');
        //     let refreshTokenResponse = await axios.post('/api/login/refresh', { emailAddress: 'climber@climber.com', token: refreshToken });
        //     localStorage.setItem('accessToken', refreshTokenResponse.data.token);
        //     localStorage.setItem('refreshToken', refreshTokenResponse.data.refreshToken.token);
        //     localStorage.setItem('refreshTokenExpiration', refreshTokenResponse.data.refreshToken.expiration);
        //     axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        //     const secondPostResponse = await axios.post('/api/climbingsession', climbingSession);
        //     if (secondPostResponse.data.status === 401) {
        //         console.log('failed to refresh access token');
        //     }
        // }
        const response = await axios.get('/api/climbingsession');
        const fetchedClimbingSessions = response.data;
        dispatch({ type: SET_CLIMBING_SESSIONS, payload: fetchedClimbingSessions });
    };
};

export const useFetchClimbingSessions = () => {
    const dispatch = useDispatch();
    return async () => {
        if (process.env.STORYBOOK_MODE) {
            const fetchedClimbingSessions = mockApi.climbingSessions;
            dispatch({ type: SET_CLIMBING_SESSIONS, payload: fetchedClimbingSessions });
            return;
        }
        const response = await axios.get('/api/climbingsession');
        console.log(response);
        const fetchedClimbingSessions = response.data;
        dispatch({ type: SET_CLIMBING_SESSIONS, payload: fetchedClimbingSessions });
    };
};