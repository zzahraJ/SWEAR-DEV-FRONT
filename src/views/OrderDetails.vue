<script setup>
import DetailPerOrder from '../components/DetailPerOrder.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const orderId = computed(() => route.params.id);
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-semibold mb-4 text-center m-2">Order Details</h2>
    <div class="bg-green-400 p-4 mx-8 my-8 rounded-md shadow-md">
      <div class="mb-4">
        <p class="text-lg font-semibold">
          Order ID:
          <span class="ml-2">{{ orderId }}</span>
        </p>
      </div>
      <DetailPerOrder :orderId="orderId" />
    </div>
  </div>
</template>


<style scoped>
</style>