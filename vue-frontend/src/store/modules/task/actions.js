import axios from "axios";
import { 
    CREATE_TASK_ACTION, 
    DELETE_TASK_ACTION, 
    GET_TASK_ACTION, 
    SET_USER_TASK_MUTATION, 
    UPDATE_COMPLETE_STATUS, 
    UPDATE_TASK_ACTION, 
    REMOVE_DELETED_TASK_MUTATION,
    REMOVE_COMPLETED_TASK_MUTATION
} from "../../storeconstants";

export default{
    async [CREATE_TASK_ACTION](context, payload) {
        let data = {
            title: payload.title,
            description: payload.description,
        }

        let res = ''
        try {
            res = await axios.post('/tasks', data);
        } catch (err) {
            let errMsg
            if (err.response.status === 401) {
                errMsg = err.response.data.message
                throw errMsg;
            }else if (err.response.status === 422) {
                errMsg = err.response.data.errors
                throw errMsg;
            }else {
                throw err;
            }
               
        }

        if(res.status === 201) {
            let data = {
                tasks: res.data.data
            }

            context.commit(SET_USER_TASK_MUTATION, data);
        }
    },

    async [UPDATE_TASK_ACTION](context, payload) {
        let data = {
            title: payload.title,
            description: payload.description
        }

        let res = ''
        try {
            res = await axios.patch(`/tasks/${payload.id}`, data);
        } catch (err) {
            let errMsg
            if (err.response.status === 401) {
                errMsg = err.response.data.message
                throw errMsg;
            }else if (err.response.status === 422) {
                errMsg = err.response.data.errors
                throw errMsg;
            }else {
                throw err;
            }
               
        }

        if(res.status === 200) {
            let data = {
                tasks: res.data.data
            }

            context.commit(SET_USER_TASK_MUTATION, data);
        }
    },

    async [UPDATE_COMPLETE_STATUS](context, payload) {
        let data = {
            completed: payload.completed
        }
       
        let res = ''
        try {
            res = await axios.patch(`/tasks/${payload.id}`, data);
        } catch (err) {
            let errMsg
            if (err.response.status === 401) {
                errMsg = err.response.data.message
                throw errMsg;
            }else if (err.response.status === 422) {
                errMsg = err.response.data.errors
                throw errMsg;
            }else {
                throw err;
            }
               
        }
      
        if(res.status === 200) {
            let data = {
                tasks: res.data.data
            }

            context.commit(REMOVE_COMPLETED_TASK_MUTATION, payload);
        }
    },

    async [GET_TASK_ACTION](context, payload) {
        let res = ''
        try {
            res = await axios.get('/tasks');
        } catch (err) {
            let errMsg
            if (err.response.status === 401) {
                errMsg = err.response.data.message
                throw errMsg;
            }else if (err.response.status === 422) {
                errMsg = err.response.data.errors
                throw errMsg;
            }else {
                throw err;
            }
        }

        if(res.status === 200) {
            let data = {
                tasks: res.data.data
            }

            context.commit(SET_USER_TASK_MUTATION, data);
        }
    },
    async [DELETE_TASK_ACTION](context, payload) {
        let res = ''
        try {
            res = await axios.delete(`/tasks/${payload.id}`);
        } catch (err) {
            let errMsg
            if (err.response.status === 401) {
                errMsg = err.response.data.message
                throw errMsg;
            }else if (err.response.status === 422) {
                errMsg = err.response.data.errors
                throw errMsg;
            }else {
                throw err;
            }
        }

        if(res.status === 204) {
            context.commit(REMOVE_DELETED_TASK_MUTATION, payload);
        }
    },

}