import { createApp } from "vue";
// import "./style.css";
// import "./assets/scss/main.scss";
import router from './router';
import store from './store/store';
import App from "./App.vue";
import './axios';

createApp(App).use(router).use(store).mount("#app");
