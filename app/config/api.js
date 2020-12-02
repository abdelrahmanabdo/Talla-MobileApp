import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//Urls
const _DEV = 'http://10.0.3.2:8000/api/v1/';
const _LOCALHOST_DEV = 'http://localhost:8000/api/v1/';
const _PROD = '';

const axiosApiInstance = axios.create({
   baseURL: _LOCALHOST_DEV,
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    config.headers = { 
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

export default axiosApiInstance;