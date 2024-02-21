<script setup>
import { RouterLink, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import store from "../store/userStore";
import Cookies from "js-cookie";

const name = ref("");
const email = ref("");
const password = ref("");

const router = useRouter();

const handleRegister = () => {
    if (!name.value.trim() || !email.value.trim() || !password.value.trim()) {
        alert("Please fill in all fields.");
        return;
    }
    store.dispatch("registerUser", {
        name: name.value,
        email: email.value,
        password: password.value,
    });

    name.value = "";
    email.value = "";
    password.value = "";

    setTimeout(() => {
        window.location.href = "/";
    }, 1000);
};
</script>

<template>
    <div class="bg-gray-100 flex justify-center items-center h-screen">
        <div class="w-1/2 h-screen hidden lg:block">
            <img
                src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
                alt="Placeholder Image"
                class="object-cover w-full h-full"
            />
        </div>

        <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <h1 class="text-2xl font-semibold mb-4">Register</h1>
            <form @submit.prevent="handleRegister">
                <div class="mb-4">
                    <label for="username" class="block text-gray-600"
                        >Name</label
                    >
                    <input
                        type="text"
                        v-model="name"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div class="mb-4">
                    <label for="email" class="block text-gray-600">Email</label>
                    <input
                        type="email"
                        v-model="email"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-gray-600"
                        >Password</label
                    >
                    <input
                        type="password"
                        v-model="password"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                >
                    Register
                </button>
            </form>

            <div class="mt-6 text-blue-500 text-center">
                <RouterLink to="/login" class="hover:underline"
                    >login here</RouterLink
                >
            </div>
        </div>
    </div>
</template>
