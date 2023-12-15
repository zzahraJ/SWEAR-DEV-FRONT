<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import ChangePasswordForm from "../components/ChangePasswordForm.vue";

const router = useRouter();
const token = localStorage.getItem('token');

onMounted(() => {
  // If there is no token, redirect to login
  if (!token) {
    router.push('/updatePassword');
  }
});
</script>

<template>
  <div>
    <template v-if="token">
      <ChangePasswordForm />
    </template>
    
    <template v-else>
      <p>Please login first to access the Update Password function.</p>
    </template>
  </div>
  
</template>