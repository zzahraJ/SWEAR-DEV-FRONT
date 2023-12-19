<script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";

  let socket = null;

  const props = defineProps(['orderId']);

  let orderId = ref(props.orderId);  

  onMounted(() => {
    socket = new WebSocket("wss://swear-dev-back.onrender.com/primus");
  });
  
  const statusShoe = ref("Change status");
  const error = ref(null);
  

  const StatusUpdate = async () => {
    try {
        console.log(orderId.value);
        const response = await fetch(`https://swear-dev-back.onrender.com/api/v1/sneakers/${orderId.value}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          status: statusShoe.value,
        }),
      });


      if (response.ok) {
        console.log('Updated status successfully');

        const data = await response.json();
        const updateStatus = {
          action: "status",
          value: data.data.status,
        };

        console.log("this is the status", data.data.status);
        socket.send(JSON.stringify(updateStatus));
      } else if (response.status === 404) {
        console.error('Sneaker not found:', id);
      } else {
        console.error('Failed to update status. Status code:', response.status);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
</script>

<template>
  <div class="my-4">
    <select
      v-model="statusShoe"
      @change="StatusUpdate"
      class="p-2 border-5 border-green-400 rounded focus:outline-none bg-green-200 hover:bg-green-200 focus:border-green-400 font-bold mr-10"
    >
      <option value="Change status" selected disabled>Change status</option>
      <option value="Produced">Produced</option>
      <option value="Pending">Pending</option>
      <option value="Shipped">Shipped</option>
    </select>
  </div>
</template>

<style scoped></style>
