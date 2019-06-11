import axios from 'axios';
import {HOST_NAME} from './constants';
import {ActionCreator} from './reducer/application/application';

const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `${HOST_NAME}/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (error) => {
    if (error.code === `ECONNABORTED`) {
      dispatch(ActionCreator[`SET_SERVER_STATUS`](false));
    }

    return Promise.reject(error);
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
