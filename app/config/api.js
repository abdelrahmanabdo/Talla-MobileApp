import axios from 'axios';

//Urls
const _DEV = 'http://10.0.3.2:8000/api/v1/';
const _LOCALHOST_DEV = 'http://localhost:8000/api/v1/';
const _PROD = '';

export default axios.create({
   baseURL: _DEV,
   headers: {
      "Accept": "application/json",
   },
});