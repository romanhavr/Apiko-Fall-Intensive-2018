import axios from 'axios';

let _token = null;

export const setToken = (token) => {
    _token = token;
    
    axios.defaults.headers.Authorization = _token
    ? `Bearer ${_token}`
    : null;
}

export const Products = {
    fetch() {
        return axios.get(`/api/v1/products`);
    }
}