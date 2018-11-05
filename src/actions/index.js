import axios from 'axios';
import { FETCH_USERS } from './types';

export const fetchUsers = () => {
    let response = axios.get('/api/users');
    return {type: FETCH_USERS, payload: response}
}