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
        if (!postResponse) {
            return false;
        }
        return true;
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
        if (!response?.data) {
            return false;
        }
        dispatch({ type: SET_CLIMBING_SESSIONS, payload: response.data });
        return true;
    };
};