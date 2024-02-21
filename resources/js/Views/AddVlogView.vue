<script setup>
import { ref, onMounted } from "vue";
import store from "../store/index";
import { useRouter } from "vue-router";

const title = ref("");
const description = ref("");
const image = ref("");

const router = useRouter();

const handleImageUpload = (event) => {
    image.value = event.target.files[0];
};

const handleSubmit = () => {
    if (!title.value.trim() || !description.value.trim()) {
        alert("Please fill in all fields.");
        return;
    }
    const formData = new FormData();
    formData.append("image", image.value);
    formData.append("title", title.value);
    formData.append("description", description.value);

    store.dispatch("postAddVlog", formData);

    title.value = "";
    description.value = "";

    setTimeout(() => {
        router.push("/");
    }, 1000);
};
</script>

<template>
    <div class="flex justify-center items-center">
        <form class="border border-blue-300 p-3 flex flex-col mt-20">
            <input
                class="my-2"
                type="text"
                placeholder="title"
                v-model="title"
            />
            <textarea
                class="my-2"
                type="text"
                placeholder="description"
                v-model="description"
            />
            <input type="file" @change="handleImageUpload" />
            <buttton
                @click="handleSubmit"
                class="bg-blue-400 my-2 hover:bg-blue-500 text-white text-center cursor-pointer"
                >Add New Vlog</buttton
            >
        </form>
    </div>
</template>
