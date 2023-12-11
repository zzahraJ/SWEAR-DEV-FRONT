import{createRouter,createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Configurator from '../views/Configurator.vue';

const routes = [
    {path: "/", component: Home},
    {path: "/login", component: Login},
    {path: "/configurator", component: Configurator},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;