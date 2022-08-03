import { createStore } from "vuex";

import auth from './modules/auth/index';
import task from './modules/task/index';

const store = createStore({
    modules: {
        auth,
        task
    }
});

export default store