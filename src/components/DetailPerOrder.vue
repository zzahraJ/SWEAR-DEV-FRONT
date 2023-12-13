<script setup>
import { ref, onMounted, defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const orderDetails = ref({});

const props = defineProps(["orderId"]);

const getOrderDetails = async (orderId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/sneakers/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    if (response.ok) {
      const data = await response.json();
      orderDetails.value = data.data.sneaker; // Assuming the response is the details of a single order
      console.log(orderDetails.value);
    } else {
      console.error('Failed to fetch order details:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred during order details fetch:', error);
  }
};

onMounted(() => {
  getOrderDetails(props.orderId);
});
</script>

<template>
  <div>
    <h2>Order Details</h2>
    <p>Username: {{ orderDetails.username }}</p>
    <p>Email: {{ orderDetails.email }}</p>
    <p>Size: {{ orderDetails.size }}</p>
    <p>Laces: {{ orderDetails.laces }}</p>
    <p>Inside: {{ orderDetails.inside }}</p>
    <p>Outside_1: {{ orderDetails.outside_1 }}</p>
    <p>Outside_2: {{ orderDetails.outside_2 }}</p>
    <p>Outside_3: {{ orderDetails.outside_3 }}</p>
    <p>Sole bottom: {{ orderDetails.sole_bottom }}</p>
    <p>Sole top: {{ orderDetails.texture }}</p>
    <p>Price: {{ orderDetails.price }}</p>
    <!-- Display other order details here -->
  </div>
</template>

<style scoped>
</style>