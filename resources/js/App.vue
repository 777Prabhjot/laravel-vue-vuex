<script setup>
import { RouterView, useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";
import store from "./store/index";
import Navbar from "./components/Navbar.vue";
import Cookies from "js-cookie";

const navigate = useRouter();

const pathname = window.location.pathname.split("/")[1];

onMounted(() => {
    const token = Cookies.get("token");
    store.dispatch("fetchVlogs");
    if (token) {
        if (pathname === "login" || pathname === "register") {
            navigate.push("/");
        }
    } else {
        if (pathname === "addvlog" || pathname === "update") {
            navigate.push("/login");
        }
    }
});
</script>

<template>
    <Navbar />
    <RouterView />
</template>
