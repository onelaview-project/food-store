import axios from 'axios';

const http = axios.create({
  // TODO: move this to env file
  baseURL: 'http://localhost:3000/api/',
});

export default http;
