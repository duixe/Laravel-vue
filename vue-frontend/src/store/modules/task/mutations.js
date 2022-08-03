import { REMOVE_COMPLETED_TASK_MUTATION, REMOVE_DELETED_TASK_MUTATION, SET_USER_TASK_MUTATION } from "../../storeconstants";

export default{
    [SET_USER_TASK_MUTATION](state, payload) {
        state.tasks = payload.tasks
    },
    [REMOVE_DELETED_TASK_MUTATION](state, payload) {
        state.tasks = state.tasks.filter((task) => {
            return task.id !== payload.id;
        });
    },
    [REMOVE_COMPLETED_TASK_MUTATION](state, payload) {
        let cp = state.tasks.find((task) => {
            return task.id === payload.id;
          })
console.log(cp);
          cp.complete = !cp.complete;
    }
}