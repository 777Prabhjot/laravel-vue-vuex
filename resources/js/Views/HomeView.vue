<script setup>
  import Vlog from '../components/Vlog.vue';
  import store from '../store/index'

</script>

<template>
<div class="flex justify-center">
  <h1 class="text-2xl font-bold mt-10">Vlogs</h1>
  </div>
  <main class="flex justify-evenly p-5">
    <Vlog  v-for="vlog in store.state.vlogs" :key="vlog.id" :id="vlog.id" :title="vlog.title" :image="vlog.image && vlog.image" :description="vlog.description"/>

  </main>
</template>
