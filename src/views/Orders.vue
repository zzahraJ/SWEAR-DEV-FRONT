<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Allorders from "../components/Allorders.vue";

const router = useRouter();
const token = localStorage.getItem('token');

onMounted(() => {
  // If there is no token, redirect to login
  if (!token) {
    router.push('/orders');
  }
});
</script>

<template>
  <div>
    <template v-if="token">
      <Allorders />
    </template>
    <template v-else>
      <p>Please login first to access orders.</p>
    </template>
  </div>
  
</template>

<style scoped>
</style>