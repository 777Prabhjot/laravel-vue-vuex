import { createStore } from "vuex";
import {
    getAllVlogsApi,
    postAddVlogApi,
    deleteVlogApi,
    updateVlogApi,
} from "@/services/vlogs";

export default createStore({
    state: {
        vlogs: [
            {
                id: null,
                title: null,
                description: null,
                image: null,
                posted_by: null,
                user: {
                    name: null,
                },
            },
        ],
    },
    getters: {
        getVlogs: (state) => state.vlogs,
    },
    mutations: {
        setVlogs(state, vlogs) {
            state.vlogs = vlogs;
        },

        addVlog(state, vlog) {
            state.vlogs.push(vlog);
        },

        findVlogById(state, id) {
            const vlog = state.vlogs.filter((vlog) => vlog.id === id);
            return vlog;
        },

        deleteVlog(state, id) {
            state.vlogs = state.vlogs.filter((vlog) => vlog.id !== id);
        },

        updateVlog(state, vlog) {
            state.vlogs.forEach((v) => {
                if (v.id === Number(vlog.id)) {
                    v.title = vlog.title;
                    v.description = vlog.description;
                }
            });
        },
    },

    actions: {
        async fetchVlogs({ commit }) {
            try {
                const vlogs = await getAllVlogsApi();
                commit("setVlogs", vlogs);
            } catch (error) {
                console.log(error);
            }
        },

        async postAddVlog({ commit }, data) {
            const title = data.get("title");
            const description = data.get("description");
            const newVlog = await postAddVlogApi(data);

            try {
                commit("addVlog", {
                    id: newVlog.id,
                    title,
                    description,
                    image: newVlog.data.image,
                    posted_by: newVlog.data.posted_by,
                    user: { name: newVlog.data.username },
                });
            } catch (error) {
                console.log(error);
            }
        },

        async deleteVlog({ commit }, id) {
            try {
                await deleteVlogApi(id);
                commit("deleteVlog", id);
            } catch (error) {
                console.log(error);
            }
        },

        async updateVlog({ commit }, vlog) {
            const formData = vlog.formData;
            const title = vlog.title;
            const description = vlog.description;

            try {
                await updateVlogApi({
                    id: vlog.id,
                    title,
                    description,
                    formData,
                });
                commit("updateVlog", { id: vlog.id, title, description });
            } catch (error) {
                console.log(error);
            }
        },
    },
});
