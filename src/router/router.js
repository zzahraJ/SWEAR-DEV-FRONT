import{createRouter,createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import login from '../views/login.vue';

const routes = [
    {path: "/", component: Home},
    {path: "/login", component: login}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;