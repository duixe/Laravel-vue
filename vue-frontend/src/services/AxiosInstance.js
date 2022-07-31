import axios from "axios";
import store from '../src/store/store';
import {GET_USER_TOKEN_GETTER} from '../src/store/storeconstants'

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

axiosInstance.interceptors.request.use(
    (config) => {
      let token = store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
      const auth = token ? `Bearer ${token}` : '';
      config.headers.common['Authorization'] = auth;
      return config;
    });
  
  export default axiosInstance;