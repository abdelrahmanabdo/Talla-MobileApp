import axios from 'axios';
//http://localhost:8000/api/v1/
//https://api.tallah.com/api/v1/
export default
axios.create({
   baseURL: 'http://localhost:8000/api/v1/',
   headers: {
      'Cache-control' : 'no-store, no-cache, no-transform, must-revalidate, max-age=0'
   },
});