import { createRouter, createWebHistory } from "vue-router";

import Auth from '/src/views/Auth.vue';
import Home from '/src/views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Auth',
        component: Auth
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;