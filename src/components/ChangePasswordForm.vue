<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref('');
const oldPassword = ref('');
const newPassword = ref('');
const error = ref('');

const changePassword = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/users/change-password', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username.value,
                oldPassword: oldPassword.value,
                newPassword: newPassword.value,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            router.push('/');
        } else {
            console.error('Unexpected response format:', data);
            error.value = data.message || 'Unknown error';
        }
    } catch (error) {
        console.error('An error occurred during password change:', error);
        error.value = 'An error occurred. Please try again.';
    }
};
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-stone-400">
        <form @submit.prevent="changePassword" class="bg-white p-8 rounded shadow-md w-2/5">
            <div class="mb-[32px]">
                <h2 class="flex items-center justify-center text-xl m-4">Update Password</h2>
                <div class="mb-4">
                    <label for="username" class="block text-gray-600 text-sm font-semibold mb-2">Username</label>
                    <input v-model="username" type="text" id="username"
                           class="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:border-gray-950"
                    />
                </div>
                <div class="mb-4">
                    <label for="oldPassword" class="block text-gray-600 text-sm font-semibold mb-2">Old Password</label>
                    <input v-model="oldPassword" type="password" id="oldPassword"
                           class="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:border-gray-950"
                    />
                </div>
                <div class="mb-4">
                    <label for="newPassword" class="block text-gray-600 text-sm font-semibold mb-2">New Password</label>
                    <input v-model="newPassword" type="password" id="newPassword"
                           class="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:border-gray-950"
                    />
                </div>
            </div>
            <div v-if="error" class="text-red-500 mb-4 text-xs">{{ error }}</div>

            <button type="submit"
                    class="w-full bg-green-400 text-white py-2 px-4 rounded-md hover:bg-black focus:outline-none focus:border-green-500">
                Update Password
            </button>
        </form>
    </div>
</template>

<style scoped>
</style> 
