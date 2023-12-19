<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const token = localStorage.getItem('token');
const orders = ref([]);
let socket = null;




onMounted(() => {
  getOrders();
  socket = new WebSocket('ws://localhost:3000/primus');

  socket.onmessage = (event) => {

    let newOrder = JSON.parse(event.data);
    // console.log(newOrder);

    if(newOrder.action === "add") {
      // add date to new order
      newOrder.date = new Date();
      // add new order to orders
      orders.value.data.sneakers.push(newOrder);
    }


  }
});

const formatDate = (date) => {
  // console.log('Original date:', date);

  if (!date || isNaN(new Date(date).getTime())) {
    console.log('Invalid date:', date);
    return 'Invalid Date';
  }

  const dateObj = { timeZone: 'Europe/Brussels', dateStyle: 'long', timeStyle: 'short' };
  return new Intl.DateTimeFormat('en-US', dateObj).format(new Date(date));
};

const getOrders = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/sneakers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.ok) {
      const data = await response.json();
      // console.log('Orders:', data);
      orders.value = data;
    } else {
      console.error('Failed to fetch orders:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred during order fetch:', error);
  }
};
const goToOrderDetails = (orderId) => {
  router.push(`/orderDetails/${orderId}`);
};
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-14 text-center m-4">ALL ORDERS ({{ orders.data?.sneakers.length || 0 }})</h2>
    <div class="flex flex-wrap -mt-5 items-center justify-center">
      <div v-for="order in orders.data?.sneakers" :key="order._id" class="order-card bg-green-200 mx-4 mb-4 p-6 border rounded-md shadow-md w-81 h-81">
        <h2 class="text-lg font-semibold">{{ order.username }}</h2>
        <div class="mb-2">
          <p class="font-semibold">Email:</p>
          <p>{{ order.email }}</p>
        </div>
        <p class="mb-2">{{ 'Size: ' + order.size }}</p>
        <p>{{ order.statusShoe }}</p>
        <p>{{ 'Date: ' + formatDate(order.date) }}</p>
        <!-- Button to go to OrderDetails page -->
        <button @click="goToOrderDetails(order._id)" class="bg-green-400 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-600 mt-4">
          Order Details
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>