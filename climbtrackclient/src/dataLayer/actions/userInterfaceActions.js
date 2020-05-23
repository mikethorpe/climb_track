import { useDispatch } from 'react-redux';
import { SET_SHOW_CLIMBLOGGER_MODAL, SET_SHOW_SESSIONDETAILS_MODAL } from './types';

export const useDisplayClimbLoggerModal = () => {
    const dispatch = useDispatch();

    return (displayModal) => {
        dispatch({ type: SET_SHOW_CLIMBLOGGER_MODAL, payload: displayModal });
    }
};

export const useDisplaySessionDetailsModal = () => {
    const dispatch = useDispatch();

    return (displayModal) => {
        dispatch({ type: SET_SHOW_SESSIONDETAILS_MODAL, payload: displayModal });
    }
};