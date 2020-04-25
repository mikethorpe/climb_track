import { useDispatch } from 'react-redux';
import axios from 'axios';
import mockApi from '../mockApi/mockApi';
import { SET_STYLES } from './types';

export const useFetchStyles = () => {
    const dispatch = useDispatch();
    return () => {
        const fetchedStyles = mockApi.styles;
        //await axios.get('/styles');
        dispatch({ type: SET_STYLES, payload: fetchedStyles });
    }
};