import React from 'react';
import AxiosService from '../services/axiosService';

export function fetchTodos() {
    AxiosService.get('todos')
        .then(
        (value) => {
            this.setState({
                todos: value.data.data
            }
            );
        });
}


export default TodoServices;