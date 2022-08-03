import { GET_USER_TASK_GETTER, GET_USER_TASK_COMPLETED_GETTER, GET_USER_TASK_ONGOING_GETTER } from "../../storeconstants";

export default{
    [GET_USER_TASK_GETTER]: (state) => state.tasks,
    [GET_USER_TASK_COMPLETED_GETTER]: (state) => state.tasks.filter(task => task.completed ),
    [GET_USER_TASK_ONGOING_GETTER]: (state) => state.tasks.filter(task => !task.completed ),
}