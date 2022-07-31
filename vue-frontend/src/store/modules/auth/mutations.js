import { SET_RESPONSE_TOKEN } from "../../storeconstants";

export default{
    [SET_RESPONSE_TOKEN](state, payload){
        state.access_token = payload.access_token
        state.user = payload.user
    }

}