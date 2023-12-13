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
  <div class="p-4">
    <h2 class="text-2xl font-semibold mb-4">Order Details</h2>
    <div class="bg-white p-4 rounded-md shadow-md">
      <div class="mb-4">
        <p class="text-lg font-semibold">
          Username:
          <span class="ml-2">{{ orderDetails.username }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          Email:
          <span class="ml-2">{{ orderDetails.email }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          Size:
          <span class="ml-2">{{ orderDetails.size }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          Laces:
          <span class="ml-2">{{ orderDetails.laces }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          Inside:
          <span class="ml-2">{{ orderDetails.inside }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          Outside_1:
          <span class="ml-2">{{ orderDetails.outside_1 }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          Outside_2:
          <span class="ml-2">{{ orderDetails.outside_2 }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          Outside_3:
          <span class="ml-2">{{ orderDetails.outside_3 }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          Sole bottom:
          <span class="ml-2">{{ orderDetails.sole_bottom }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          Sole top:
          <span class="ml-2">{{ orderDetails.texture }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          Price:
          <span class="ml-2">{{ orderDetails.price }}</span>
        </p>
      </div>
      <!-- Add more order details as needed -->
    </div>
  </div>
</template>


<style scoped>
</style>