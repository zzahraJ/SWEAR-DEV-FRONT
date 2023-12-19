<script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";

  let socket = null;

  const props = defineProps(['orderId']);

  let orderId = ref(props.orderId);  

  onMounted(() => {
    socket = new WebSocket("ws://localhost:3000/primus");
  });
  
  const statusShoe = ref("Change status");
  const error = ref(null);
  

  const StatusUpdate = async () => {
    try {
        console.log(orderId.value);
        const response = await fetch(`http://localhost:3000/api/v1/sneakers/${orderId.value}`, {
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


<!-- <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";

  const route = useRoute();
  let socket = null; 

  onMounted(() => {
    socket = new WebSocket("ws://localhost:3000/primus");
  });


  // Set a default value
  const statusShoe = ref("Change status");
  const error = ref(null);

  const StatusUpdate = async () => {
    try {
      // get the sneaker id from the url
        const id = route.params.id;

      // Make a PATCH request to your API to update the status
      const response = await fetch(`http://localhost:3000/api/v1/sneakers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: statusShoe.value,
        }),
      });

      // status update
      if (response.ok) {
        console.log('updated status successfully');

        let data = await response.json();
        console.log(data.status);
        
        let updateStatus={
          action:"status",
          value:data.data.status
        }
        console.log(data.data.status);
        socket.send(JSON.stringify(updateStatus));

      } else {
        console.error('failed to update status');
      }
    } catch (error) {
      console.error('error updating status:', error);
    }
  };
</script>

<template>
    <div class="my-4">
      <select
        v-model="statusShoe"
        @change="StatusUpdate"
        class="p-2 border-5 border-green-400 rounded focus:outline-none bg-green-200 hover:bg-green-200 focus:border-green-400 font-bold mr-10">
        <option value="Change status" selected disabled>Change status</option>
        <option value="Produced">Ready to be produced</option>
        <option value="Pending">Waiting to be shipped</option>
        <option value="Shipped">Shipped</option>
      </select>
    </div>
</template>
  
<style scoped></style>   -->