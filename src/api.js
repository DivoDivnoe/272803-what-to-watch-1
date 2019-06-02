import axios from 'axios';
import ActionCreator from './reducer/user/user';

const FORBIDDEN_STATUS_CODE = 403;

const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === FORBIDDEN_STATUS_CODE) {
      dispatch(ActionCreator[`REQUIRED_AUTHORIZATION`](true));
    }

    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
