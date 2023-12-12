import{createRouter,createWebHistory} from 'vue-router';
import Login from '../views/Login.vue';
// import updatePassword from '../views/UpdatePassword.vue';
// import Orders from '../views/Orders.vue';
// import Details from '../views/OrderDetails.vue';
//import Configurator from '../views/Configurator.vue';

const routes = [

    {path: '/', component: Login},
    // {path: '/UpdatePassword', component: updatePassword},
    // {path: '/orders', component: Orders},
    // {path: '/orders/:id', component: Details},

    //{path: "/configurator", component: Configurator},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;