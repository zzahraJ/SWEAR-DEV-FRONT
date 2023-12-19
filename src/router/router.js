import{createRouter,createWebHashHistory} from 'vue-router';
import Login from '../views/Login.vue';
import Orders from '../views/Orders.vue';
import OrderDetails from '../views/OrderDetails.vue';
import ChangePassword from '../views/ChangePassword.vue';

const routes = [
    {path: '/', component: Login},
    {path: '/orders', component: Orders},
    {path: '/orderDetails/:id', component: OrderDetails},
    {path: '/updatePassword', component: ChangePassword},
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;