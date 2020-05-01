import { useDispatch } from 'react-redux';
import axios from 'axios';
import mockApi from '../mockApi/mockApi';
import { SET_STYLES } from './types';

export const useFetchStyles = () => {
    const dispatch = useDispatch();
    return async () => {
        if (process.env.STORYBOOK_MODE) {
            const fetchedStyles = mockApi.styles;
            dispatch({ type: SET_STYLES, payload: fetchedStyles });
            return;
        }
        const response = await axios.get('/api/style');
        const fetchedStyles = response.data;
        dispatch({ type: SET_STYLES, payload: fetchedStyles });
    }
};