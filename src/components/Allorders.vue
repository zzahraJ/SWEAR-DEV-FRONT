<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const token = localStorage.getItem('token');
const orders = ref([]);

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
      orders.value = data; // Assuming the response is an array of orders
    } else {
      console.error('Failed to fetch orders:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred during order fetch:', error);
  }
};

onMounted(() => {
  getOrders();
});

const goToOrderDetails = (orderId) => {
  router.push(`/orderDetails/${orderId}`);
};
</script>

<template>
  <div >
    <h2 class="text-2xl font-semibold mb-14 text-center m-4">ALL ORDERS</h2>
    <div class="flex flex-wrap -mt-5">
      <div v-for="order in orders.data?.sneakers" :key="order._id" class="order-card bg-green-200 mx-4 mb-4 p-6 border rounded-md shadow-md w-81 h-81">
        <h2 class="text-lg font-semibold">{{ order.username }}</h2>
        <div class="mb-2">
          <p class="font-semibold">Email:</p>
          <p>{{ order.email }}</p>
        </div>
        <p class="mb-2">{{ 'Size: ' + order.size }}</p>
        <!-- Button to go to OrderDetails page -->
        <button @click="goToOrderDetails(order._id)" class="bg-green-400 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-600 mt-4">
          Order Details
        </button>
      </div>
    </div>
  </div>
</template>


<!-- <template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">ALL ORDERS</h1>
    <div class="flex flex-wrap -mx-4">
      <div v-for="order in orders.data?.sneakers" :key="order._id" class="order-card mx-4 mb-4 p-4 border rounded-md shadow-md w-64 h-64">
        <h2 class="text-lg font-semibold">{{ order.username }}</h2>
        <div class="mb-2">
          <p class="font-semibold">Email:</p>
          <p>{{ order.email }}</p>
        </div>
        <p class="mb-2">Size: {{ 'Size: ' + order.size }}</p>
        !-- Button to go to OrderDetails page --
        <button @click="goToOrderDetails(order._id)" class="bg-green-400 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-600 mt-4">
          Order Details
        </button>
      </div>
    </div>
  </div>
</template> -->



<style scoped>
</style>