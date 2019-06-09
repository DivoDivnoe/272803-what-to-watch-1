import axios from 'axios';
import {HOST_NAME} from './constants';

const createAPI = () => {
  const api = axios.create({
    baseURL: `${HOST_NAME}/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  return api;
};

export default createAPI;
