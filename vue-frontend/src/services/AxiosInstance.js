import axios from "axios";
import store from '../store/store';
import {GET_USER_TOKEN_GETTER} from './../store/storeconstants'

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

axiosClient.interceptors.request.use(
    (config) => {
      let token = store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
      const auth = token ? `Bearer ${token}` : '';
      config.headers.common['Authorization'] = auth;
      return config;
    });
  
export default axiosClient;