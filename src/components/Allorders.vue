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
      console.log(data);
      
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
</script>

<template>
    <div>
      <h1>ALL ORDERS</h1>
      <div class="order-cards">
        <div v-for="order in orders.data.sneakers" :key="order._id" class="order-card">
          <!-- Display order details here -->
          <h2>Username:{{ order.username }}</h2>
          <p>Email: {{ order.email }}</p>
          <p>Size: {{ order.size }}</p>
          <!-- Add more details as needed -->
        </div>
      </div>
    </div>
  </template>

<style scoped>
.order-cards {
  display: flex;
  flex-wrap: wrap;
}

.order-card {
  border: 1px solid blue;
  padding: 10px;
  margin: 10px;
  width: 200px; /* Adjust as needed */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>