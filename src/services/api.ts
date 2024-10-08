import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test.v5.pryaniky.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth'] = token;
  }
  return config;
});

export default api;
