// axiosService.js
import axios from 'axios';
import { BASE_URL } from '../constants/api_constants';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: BASE_URL, // or your API base URL
  timeout: 20000, // 10 seconds
  headers: {
    // Add any default headers here
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Log request details
    console.log(
      `%cRequest: ${config.method.toUpperCase()} ${config.url}`,
      'color: blue; font-weight: bold;'
    );
    console.log('Request config:', config);
    
    // You can modify request config here (e.g., add auth token)
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    return config;
  },
  (error) => {
    // Log request error
    console.log(
      `%cRequest Error: ${error.message}`,
      'color: red; font-weight: bold;'
    );
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful response
    console.log(
      `%cResponse: ${response.status} ${response.config.url}`,
      'color: green; font-weight: bold;'
    );
    console.log('Response data:', response.data);
    return response;
  },
  (error) => {
    // Log error response
    if (error.response) {
      // The request was made and the server responded with a status code
      console.log(
        `%cError Response: ${error.response.status} ${error.config.url}`,
        'color: orange; font-weight: bold;'
      );
      console.log('Error data:', error.response.data);
      console.log('Error headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(
        `%cNo Response: ${error.config.url}`,
        'color: red; font-weight: bold;'
      );
      console.log('Error request:', error.request);
    } else {
      // Something happened in setting up the request
      console.log(
        '%cRequest Setup Error:',
        'color: red; font-weight: bold;',
        error.message
      );
    }
    
    // You can handle specific status codes here
    // if (error.response?.status === 401) {
    //   // Handle unauthorized access
    //   window.location.href = '/login';
    // }
    
    return Promise.reject(error);
  }
);

// HTTP Methods
const httpService = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data, config = {}) => axiosInstance.put(url, data, config),
  patch: (url, data, config = {}) => axiosInstance.patch(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
  
  // You can add other methods as needed
  request: (config) => axiosInstance.request(config),
  head: (url, config = {}) => axiosInstance.head(url, config),
  options: (url, config = {}) => axiosInstance.options(url, config),
};

export default httpService;