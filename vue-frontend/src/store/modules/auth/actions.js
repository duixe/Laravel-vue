import Axios  from 'axios';
import { IS_LOGGED_IN_ACTION, LOGIN_ACTION, LOGOUT_ACTION, REGISTER_ACTION, SET_RESPONSE_TOKEN, SET_USER_TASK_MUTATION } from '../../storeconstants';
export default{

    [LOGOUT_ACTION](context) {
        context.commit(SET_RESPONSE_TOKEN, {
            access_token: null,
            user: null
        });

        context.commit(SET_USER_TASK_MUTATION, {
            task: []
        });

        localStorage.removeItem('userData');
    },

    [IS_LOGGED_IN_ACTION](context, payload) {
        let userData = localStorage.getItem('userData');

        if (userData) {
            context.commit(SET_RESPONSE_TOKEN, JSON.parse(userData));
        }
    },

    async [LOGIN_ACTION](context, payload) {
        let data = {
            email: payload.email,
            password: payload.password,
        };
        
        let res = ''
        try {
            res = await Axios.post('/login', data);
        } catch (err) {
            let errMsg
            if (err.response.status === 401) {
                errMsg = err.response.data.message
            }
            
            throw errMsg;
        }

        if(res.status === 200) {
            let data = {
                access_token: res.data.data.access_token,
                user: res.data.data.user
            }

            localStorage.setItem('userData', JSON.stringify(data));
            context.commit(SET_RESPONSE_TOKEN, data);
        }
    },

    async [REGISTER_ACTION](context, payload) {
        let data = {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            password_confirmation: payload.password_confirmation
        };
        
        let res = ''
        try {
            res = await Axios.post('/register', data);
        } catch (err) {
            // console.log(err.response.status);
            // checking for only email
            // console.log(err.response.data.errors.email[0]);
            let errMsg = err.response.data.errors.email[0];
            throw errMsg;
        }

        if(res.status === 200) {
            let data = {
                access_token: res.data.data.access_token,
                user: res.data.data.user
            }

            localStorage.setItem('userData', JSON.stringify(data));
            context.commit(SET_RESPONSE_TOKEN, data);
        }
    }
}