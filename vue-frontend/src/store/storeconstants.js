/**
 * Auth Vuex Store Constants
 */
export const REGISTER_ACTION = '[actions] register user';
export const LOGIN_ACTION = '[actions] user login';
export const IS_LOGGED_IN_ACTION = '[actions] is user still logged depending on the local storage'
export const LOGOUT_ACTION = '[actions] user logout';
export const SET_RESPONSE_TOKEN = '[mutations] Set user access token mutation';
export const GET_USER_TOKEN_GETTER = '[getters] get user token';
export const GET_USER_DATA_GETTER = '[getters] get user data';
export const IS_USER_AUTHENTICATED_GETTER = '[getters] is user authenticated';

/** 
 * Task Vuex Store Contants
 * 
 */
export const CREATE_TASK_ACTION = '(actions) create Task';
export const UPDATE_TASK_ACTION = '(actions) update Task';
export const UPDATE_COMPLETE_STATUS = '(actions) update the complete status of a given task';
export const DELETE_TASK_ACTION = '(actions) delete task'; 
export const GET_TASK_ACTION = '(actions) get task from server'; 
export const SET_USER_TASK_MUTATION = '(mutations) create Task';
export const REMOVE_DELETED_TASK_MUTATION = '(mutations) remove task from current tasks'
export const REMOVE_COMPLETED_TASK_MUTATION = '(mutations) remove Completed task from current tasks'
export const GET_USER_TASK_GETTER = '(getters) get task';
export const GET_USER_TASK_COMPLETED_GETTER = '(getters) get Completed task';
export const GET_USER_TASK_ONGOING_GETTER = '(getters) get NOT Completed task';
