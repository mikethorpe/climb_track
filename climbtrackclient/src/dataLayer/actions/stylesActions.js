import { useDispatch } from 'react-redux';
import axios from 'axios';
import mockApi from '../mockApi/mockApi';
import { SET_STYLES } from './types';

export const useFetchStyles = () => {
    const dispatch = useDispatch();
    return async () => {
        const response = await axios.get('/api/style');
        const fetchedStyles = response.data;
        // const fetchedStyles = mockApi.styles;
        dispatch({ type: SET_STYLES, payload: fetchedStyles });
    }
};