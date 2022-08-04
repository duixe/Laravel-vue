import { createRouter, createWebHistory } from "vue-router";

import Register from '/src/views/auth/Register.vue';
import Login from '/src/views/auth/Login.vue';
import Home from '/src/views/Home.vue';
import AddTask from '/src/views/AddTask.vue';
import EditTask from '/src/views/EditTask.vue';
import NotFound from '/src/views/NotFound.vue';
import store from '../store/store';
import { IS_USER_AUTHENTICATED_GETTER } from "../store/storeconstants";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {auth: true},
    },
    {
        path: '/add',
        name: 'AddTask',
        component: AddTask,
        meta: {auth: true},
    },
    {
        path: '/edit/:id ',
        name: 'EditTask',
        component: EditTask,
        props: true,
        meta: {auth: true}
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {auth: false},
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {auth: false},
    },
    {   path: '/:pathMatch(.*)*', 
        name: 'not-found', 
        component: NotFound 
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (
        to.meta.auth && 
        !store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]
    ) {
        next('/login');
    }else if (
        !to.meta.auth && 
        store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]
    ) {
        next('/');
    }else {
        next();
    }
})

export default router;