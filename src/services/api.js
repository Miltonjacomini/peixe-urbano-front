import axios from 'axios';

const instance = axios.create({
  // baseURL: "https://peixe-urbano-backend.herokuapp.com/api"
  baseURL: "http://localhost:8080/api"
});

export default instance;