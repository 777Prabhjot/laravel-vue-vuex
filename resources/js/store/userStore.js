import { createStore } from 'vuex';
import {loginApi, registerApi} from '../services/user.js';
import {getUserInfoApi} from '../services/vlogs.js'
import Cookies from 'js-cookie';


export default createStore({
    state: {
        user: {}
    },
        mutations: {
            setUser(state, userInfo){
                state.user = userInfo;
            },
        },

        actions: {
            async loginUser({commit}, userInfo){
                try {
                    const data = await loginApi(userInfo);
                    Cookies.set('token', data.token);
                    Cookies.set('currentUserId', data.currentUserId);
                    Cookies.set('name', data.name);

                } catch (error) {
                    console.log(error);
                }     
            },


            async registerUser({commit}, userInfo){
                try {
                    const data = await registerApi(userInfo);
                    Cookies.set('token', data.token);
                    Cookies.set('currentUserId', data.currentUserId);
                    Cookies.set('name', data.name);
                    
                } catch (error) {
                    console.log(error);
                }     
            },

            async getUserInfo({commit}){
                const data = await getUserInfoApi();
                commit('setUser', data);
            }

        }


})