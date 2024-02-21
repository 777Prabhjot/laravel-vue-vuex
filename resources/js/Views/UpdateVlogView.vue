<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "../store/index";

const title = ref("");
const description = ref("");
const image = ref("");

const route = useRoute();
const navigate = useRouter();
const id = route.params.id;

onMounted(() => {
    store.state.vlogs.forEach((vlog) => {
        if (vlog.id == id) {
            title.value = vlog.title;
            description.value = vlog.description;
        }
    });
});

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

    store.dispatch("updateVlog", {
        id: id,
        title: title.value,
        description: description.value,
        formData,
    });

    title.value = "";
    description.value = "";

    setTimeout(() => {
        navigate.push("/");
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
                >Update Vlog</buttton
            >
        </form>
    </div>
</template>
