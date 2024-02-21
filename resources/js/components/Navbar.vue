<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import store from "../store/userStore";
import Cookies from "js-cookie";

const token = ref("");
const name = ref("");

onMounted(() => {
    const userToken = Cookies.get("token");
    token.value = userToken;
    name.value = Cookies.get("name");
});

const handleLogOut = () => {
    Cookies.remove("token");
    Cookies.remove("currentUserId");
    Cookies.remove("name");
    token.value = "";
    name.value = "";
    window.location.reload();
};
</script>

<template>
    <div class="bg-gray-500 p-2 flex justify-between">
        <RouterLink class="text-2xl font-bold text-white ms-4" to="/"
            >Vlogs</RouterLink
        >
        <div class="flex me-4">
            <RouterLink to="/" class="text-white text-xl me-4">Home</RouterLink>
            <div v-if="token">
                <RouterLink to="/addvlog" class="text-white text-xl"
                    >Add Vlog</RouterLink
                >
                <select class="ms-4 p-2 font-bold cursor-pointer rounded-md">
                    <option class="capitalize" hidden>{{ name }}</option>
                    <option class="cursor-pointer" @click="handleLogOut">
                        Log Out
                    </option>
                </select>
            </div>
            <div class="flex" v-else>
                <RouterLink to="/login" class="text-white text-xl me-4"
                    >Login</RouterLink
                >
                <RouterLink to="/register" class="text-white text-xl me-4"
                    >Register</RouterLink
                >
            </div>
        </div>
    </div>
</template>
