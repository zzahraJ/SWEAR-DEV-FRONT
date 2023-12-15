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

// delete order with this id
const deleteOrder = async (orderId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/sneakers/${props.orderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    if (response.ok) {
      router.push('/orders');
    } else {
      console.error('Failed to delete order:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred during order delete:', error);
  }
};

onMounted(() => {
  getOrderDetails(props.orderId);
});
</script>

<template>
  <div class="p-0">
    <div class="bg-white p-4 rounded-md shadow-md">
      <div class="mb-4">
        <p class="text-lg font-semibold">
          <span class="font-black">Username:</span>
          <span class="ml-2">{{ orderDetails.username }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold ">
          <span class="font-black"> Email: </span>
          <span class="ml-2">{{ orderDetails.email }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          <span class="font-black">Size:</span>
          <span class="ml-2">{{ orderDetails.size }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          <span class="font-black">Laces color:</span>
          <span class="ml-2">{{ orderDetails.laces_color }}</span>
        </p>
      </div><div class="mb-4">
        <p class="text-lg font-semibold">
          <span class="font-black">Laces texture:</span>
          <span class="ml-2">{{ orderDetails.laces_texture }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          <span class="font-black">Inside color:</span>
          <span class="ml-2">{{ orderDetails.inside_color }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          <span class="font-black">Inside texture:</span>
          <span class="ml-2">{{ orderDetails.inside_texture }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          <span class="font-black">Outside 1 color:</span>
          <span class="ml-2">{{ orderDetails.outside_1_color }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          <span class="font-black">Outside 1 texture:</span>
          <span class="ml-2">{{ orderDetails.outside_1_texture }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          <span class="font-black">Outside 2 color:</span>
          <span class="ml-2">{{ orderDetails.outside_2_color }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          <span class="font-black">Outside 2 texture:</span>
          <span class="ml-2">{{ orderDetails.outside_2_texture }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          <span class="font-black">Outside 3 color:</span>
          <span class="ml-2">{{ orderDetails.outside_3_color }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          <span class="font-black">Outside 3 texture:</span>
          <span class="ml-2">{{ orderDetails.outside_3_texture }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          <span class="font-black">Sole bottom color:</span>
          <span class="ml-2">{{ orderDetails.sole_bottom_color }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          <span class="font-black">Sole bottom texture:</span>
          <span class="ml-2">{{ orderDetails.sole_bottom_texture }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          <span class="font-black">Sole top color:</span>
          <span class="ml-2">{{ orderDetails.sole_top_color }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          <span class="font-black">Sole top texture:</span>
          <span class="ml-2">{{ orderDetails.sole_top_texture }}</span>
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg font-semibold">
          <span class="font-black">Price:</span>
          <span class="ml-2">{{ orderDetails.price }}</span>
        </p>
      </div>

      <div class="mb-4">
        <p class="text-lg font-semibold">
          <span class="font-black">Status</span>
          <span class="ml-2">{{ orderDetails.statusShoe }}</span>
        </p>
      </div>
    </div>
    <button @click="deleteOrder" class="bg-red-500 text-white px-4 py-2 rounded-md mt-4">Delete order</button>
  </div>
</template>


<style scoped>
</style>