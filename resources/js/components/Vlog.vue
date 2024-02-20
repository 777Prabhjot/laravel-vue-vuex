<script setup>
    import store from '../store/index';
    import { useRouter } from 'vue-router';
    import { onMounted } from 'vue';

    const {id, title, description, image} = defineProps(['id', 'title', 'description', 'image']);

    const router = useRouter();

    const handleDelete = () => {
      store.dispatch('deleteVlog', id);
    }


    onMounted(async() => {
         store.dispatch('fetchVlogs')
    })

</script>

<template>
     <div class="border border-blue-400 p-4 m-2 w-[250px] h-fit flex flex-col justify-between">
      <div>
        <img v-if="image" :src="`http://127.0.0.1:8000/storage/${image}`" class="w-full h-56 object-cover" alt="Vlog image">
      <h1>Title: {{title}}</h1>
      <p class="mt-2">Description: {{description}}</p>
      </div>
      <div class="flex justify-evenly mt-2">
        <button class="bg-red-400 me-2 p-1 hover:bg-red-500 text-white" @click="handleDelete">Delete</button>
        <button class="bg-green-400 p-1 hover:bg-green-500 text-white" @click="router.push(`/update/${id}`)">Update</button>
      </div>
    </div>
</template>