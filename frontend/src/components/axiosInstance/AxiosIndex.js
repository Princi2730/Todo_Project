import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:4000', // Set the base URL to your backend server
});

export default Axios;