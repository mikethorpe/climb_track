import React from 'react';
import { useSelector } from 'react-redux';

export function ErrorModal(props){
    const {statePath} = props
    const error = useSelector(state => statePath !== undefined ? state[statePath].error : state.error)
    console.error(error)
    return error ? <div style={{color:"red"}}>{error}</div> : null
}