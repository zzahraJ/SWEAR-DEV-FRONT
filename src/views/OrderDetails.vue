<script setup>
import DetailPerOrder from '../components/DetailPerOrder.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const orderId = computed(() => route.params.id);
</script>

<template>
  <div>
    <h1>Order Details</h1>
    <p>Order ID: {{ orderId }}</p>
    <DetailPerOrder :orderId="orderId" />
  </div>
</template>

<style scoped>
</style>