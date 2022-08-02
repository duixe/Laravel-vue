import { GET_USER_TOKEN_GETTER, GET_USER_DATA_GETTER, IS_USER_AUTHENTICATED_GETTER } from "../../storeconstants";

export default{
    [GET_USER_TOKEN_GETTER]: (state) => state.access_token,
    [GET_USER_DATA_GETTER]: (state) => state.user,
    [IS_USER_AUTHENTICATED_GETTER](state) {
        return !!state.access_token
    }
}