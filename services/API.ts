import axios from 'axios';

const API = axios.create({
    baseURL: 'https://run.mocky.io/v3/'
})

export default API;
