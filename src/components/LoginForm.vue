<script setup>
import {ref, onMounted} from "vue";
//import router from "../router/router";
import {useRouter} from "vue-router";

const router = useRouter();

const username = ref('');
const password = ref('');
const error = ref('');

const Login = async () => {
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
        localStorage.setItem('token', data.data.token);
        //check the value stored in localstorage
        router.push('/orders');
    } else {
        error.value = data.message;
    }
};

</script>

<template>
      <form @submit.prevent="Login">
        <div class="mb-[32px]">
            <div class="mb-4">
                <label for="Username" class="block text-gray-600 text-sm font-semibold mb-2">Username</label>
                <input v-model="username" type="text" id="username"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-[#69FF47]" />
            </div>
            <div class="mb-4">
                <label for="password" class="block text-gray-600 text-sm font-semibold mb-2">Password</label>
                <input v-model="password" type="password" id="password"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-[#69FF47]" />
                    <router-link to="/updatePassword">Forgot password?</router-link>
            </div>
        </div>
        <div v-if="error" class="text-red-500 mb-4 text-xs">{{ error }}</div>
        
        <button type="submit"
            class="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-green-400 focus:outline-none focus:ring focus:border-green-500">
            Log in
        </button>
    </form>
</template>

<style scoped></style>
