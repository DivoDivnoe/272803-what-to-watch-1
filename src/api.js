import axios from 'axios';

export const FORBIDDEN_STATUS_CODE = 403;
export const HOST_NAME = `https://es31-server.appspot.com`;

const createAPI = () => {
  const api = axios.create({
    baseURL: `${HOST_NAME}/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === FORBIDDEN_STATUS_CODE) {
      // history.pushState(null, null, `/login`);
    }

    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
