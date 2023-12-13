import{createRouter,createWebHistory} from 'vue-router';
import Login from '../views/Login.vue';
import Orders from '../views/Orders.vue';
// import updatePassword from '../views/UpdatePassword.vue';
// import Details from '../views/OrderDetails.vue';
//import Configurator from '../views/Configurator.vue';

const routes = [

    {path: '/', component: Login},
    {path: '/orders', component: Orders},
    // {path: '/UpdatePassword', component: updatePassword},
    // {path: '/orders/:id', component: Details},

    //{path: "/configurator", component: Configurator},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;