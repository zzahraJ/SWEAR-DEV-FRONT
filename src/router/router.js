import{createRouter,createWebHistory} from 'vue-router';
import Login from '../views/Login.vue';
import Orders from '../views/Orders.vue';
import OrderDetails from '../views/OrderDetails.vue';
import ChangePassword from '../views/ChangePassword.vue';
//import Configurator from '../views/Configurator.vue';

const routes = [

    {path: '/', component: Login},
    {path: '/orders', component: Orders},
    {path: '/orderDetails/:id', component: OrderDetails},
    {path: '/updatePassword', component: ChangePassword},
    // {path: '/orders/:id', component: Details},

    //{path: "/configurator", component: Configurator},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;