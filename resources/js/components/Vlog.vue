<script setup>
import store from "../store/index";
import userStore from "../store/userStore";
import { useRouter } from "vue-router";
import { computed, onMounted, onUpdated, ref } from "vue";
import Cookies from "js-cookie";
import axios from "axios";

const { id, title, description, image, by, userId } = defineProps([
    "id",
    "title",
    "description",
    "image",
    "by",
    "userId",
]);

const currentUserId = ref(0);

const router = useRouter();

const handleDelete = () => {
    store.dispatch("deleteVlog", id);
};

onMounted(() => {
    currentUserId.value = Number(Cookies.get("currentUserId"));
});

const canEdit = computed(() => currentUserId.value === userId);
</script>

<template>
    <div
        class="border border-blue-400 p-4 m-2 w-[250px] h-fit flex flex-col justify-between"
    >
        <div>
            <img
                v-if="image"
                :src="`http://127.0.0.1:8000/storage/${image}`"
                class="w-full h-56 object-cover"
                alt="Vlog image"
            />
            <h1>Title: {{ title }}</h1>
            <p class="mt-2">Description: {{ description }}</p>
            <p class="capitalize mt-2">By: {{ by }}</p>
        </div>
        <div
            class="flex justify-evenly mt-2"
            v-if="currentUserId.value === userId || canEdit"
        >
            <button
                class="bg-red-400 me-2 p-1 hover:bg-red-500 text-white"
                @click="handleDelete"
            >
                Delete
            </button>
            <button
                class="bg-green-400 p-1 hover:bg-green-500 text-white"
                @click="router.push(`/update/${id}`)"
            >
                Update
            </button>
        </div>
    </div>
</template>
