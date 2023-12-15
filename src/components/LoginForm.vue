<script setup>
import {ref, onMounted} from "vue";
//import router from "../router/router";
import {useRouter} from "vue-router";

const router = useRouter();

const username = ref('');
const password = ref('');
const error = ref('');

const Login = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            if (data.data && data.data.token) {
                localStorage.setItem('token', data.data.token);
                router.push('/orders');
            } else {
                console.error('Unexpected response format:', data);
                error.value = 'Username or Password is wrong';
            }
        } else {
            error.value = data.message || 'Unknown error';
        }
    } catch (error) {
        console.error('An error occurred during login:', error);
        error.value = 'An error occurred. Please try again.';
    }
};

</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-stone-400">
      <form @submit.prevent="Login" class="bg-white p-8 rounded shadow-md w-2/5">
        <div class="mb-[32px]">
            <h2 class="flex items-center justify-center text-xl m-4">Login</h2>
          <div class="mb-4">
            <label for="Username" class="block text-gray-600 text-sm font-semibold mb-2">Username</label>
            <input v-model="username" type="text" id="username"
              class="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:border-gray-950"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-gray-600 text-sm font-semibold mb-2">Password</label>
            <input v-model="password" type="password" id="password"
              class="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:border-gray-950"
            />
          </div>
        </div>
        <div v-if="error" class="text-red-500 mb-4 text-xs">{{ error }}</div>
  
        <button type="submit"
          class="w-full bg-green-400 text-white py-2 px-4 rounded-md hover:bg-black focus:outline-none focus:border-green-500">
          Log in
        </button>
      </form>
    </div>
</template>

<style scoped></style>
