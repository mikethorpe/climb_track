import { CREATE_CLIMBING_SESSION } from './types';

export const createClimbingSession = (climbingSession) => {
    return {
        type: CREATE_CLIMBING_SESSION,
        payload: climbingSession
    };
};