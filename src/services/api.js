
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/', 
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'app-key':'trade',
  },
});

export default api;
