<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const token = localStorage.getItem('token');
const isLoggedIn = ref(!!token);

// Function to handle logout
const logout = () => {
  // Clear the token and update the isLoggedIn variable
  localStorage.removeItem('token');
  isLoggedIn.value = false;

  // Redirect to the login page
  router.push('/');
};

// Function to handle login
const login = () => {
  // Your login logic here

  // Set isLoggedIn to true
  isLoggedIn.value = true;

  // Redirect to the updatePassword route
  router.push('/updatePassword');
};
</script>

<template>
  <nav class="bg-green-400 flex justify-end h-[50px]">
    <div class="pr-6 p-2.5">
      <!-- Show the "Login" link if not logged in -->
      <router-link v-if="!isLoggedIn" class="nav-link mx-4 font-bold text-Stone-400 hover:text-white text-lg md:text-xl" to="/">
        Login
      </router-link>

      <!-- Show the "Update Password" and "Orders" links if logged in -->
      <router-link v-if="isLoggedIn" class="nav-link mx-4 font-bold text-Stone-400 hover:text-white text-lg md:text-xl" to="/updatePassword">
        Update Password
      </router-link>

      <router-link v-if="isLoggedIn" class="nav-link mx-4 font-bold text-Stone-400 hover:text-white text-lg md:text-xl" to="/orders">
        Orders
      </router-link>

      <!-- Show the "Logout" button if logged in -->
      <button v-if="isLoggedIn" @click="logout" class="nav-link mx-4 font-bold text-Stone-400 hover:text-white text-lg md:text-xl">
        Logout
      </button>
    </div>
  </nav>
</template>

<style scoped>
</style>
