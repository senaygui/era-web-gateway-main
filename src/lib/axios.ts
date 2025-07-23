import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://172.16.10.27/api/v1' ,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance; 