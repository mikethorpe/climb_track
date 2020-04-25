import { useDispatch } from 'react-redux';
import axios from 'axios';
import { CREATE_CLIMBING_SESSION, SET_CLIMBING_SESSIONS } from './types';
import mockApi from '../mockApi/mockApi';

export const useCreateClimbingSession = () => {
    const dispatch = useDispatch();
    return (climbingSession) => {
        dispatch({ type: CREATE_CLIMBING_SESSION, payload: climbingSession });
    };
};

export const useFetchClimbingSessions = () => {
    const dispatch = useDispatch();
    return () => {
        const fetchedClimbingSessions = mockApi.climbingSessions;
        //await axios.get('/climbingsessions');
        dispatch({ type: SET_CLIMBING_SESSIONS, payload: fetchedClimbingSessions });
    }
}