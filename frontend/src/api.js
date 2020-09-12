import axios from 'axios';

const API_ENDPOINT = 'http://localhost:3001/api';

export function getMenuList(){
    return axios.get(`${API_ENDPOINT}/menu`);
 }

export function getAllSections(){
    return axios.get(`${API_ENDPOINT}/sections`);
}

export function getAllItems(){
    return axios.get(`${API_ENDPOINT}/items`);
}