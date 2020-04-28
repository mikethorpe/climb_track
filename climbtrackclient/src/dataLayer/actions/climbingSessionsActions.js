import { useDispatch } from 'react-redux';
import axios from 'axios';
import { CREATE_CLIMBING_SESSION, SET_CLIMBING_SESSIONS } from './types';
import mockApi from '../mockApi/mockApi';

export const useCreateClimbingSession = () => {
    const dispatch = useDispatch();
    return async (climbingSession) => {
        await axios.post('/api/climbingsession', climbingSession);
        // dispatch({ type: CREATE_CLIMBING_SESSION, payload: climbingSession });
    };
};

export const useFetchClimbingSessions = () => {
    const dispatch = useDispatch();
    return async () => {
        const fetchedClimbingSessions = mockApi.climbingSessions;
        // const response = await axios.get('/api/climbingsession');
        // const fetchedClimbingSessions = response.data;
        dispatch({ type: SET_CLIMBING_SESSIONS, payload: fetchedClimbingSessions });
    }
};