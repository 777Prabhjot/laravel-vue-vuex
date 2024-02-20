<script setup>

    import {RouterLink} from 'vue-router'
</script>

<template>
    <div class="bg-gray-500 p-2 flex justify-between">
        <h1>Vlogs</h1>
        <div class="flex me-4">
            <RouterLink to="/" class="text-white me-4">Home</RouterLink>
            <RouterLink to="/addvlog" class="text-white">Add Vlog</RouterLink>
        </div>
    </div>
</template>