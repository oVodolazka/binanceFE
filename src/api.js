import axios from 'axios';

const api = axios.create({
  baseURL:'http://localhost:3001/'
});


api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('access_token')
  if(token) {
    config.headers.Authorization = token;  
  }
  return config;
});

export default api