import axios from 'axios';
import store from './store/store';
import { GET_USER_TOKEN_GETTER } from './store/storeconstants';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

let userData = localStorage.getItem('userData');
let data = JSON.parse(userData)
let token = data?.access_token;
const authToken = token ? `Bearer ${token}` : '';
axios.defaults.headers.common = {'Authorization': authToken}
