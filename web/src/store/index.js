import Vue from 'vue';
import Vuex from 'vuex';
import {reqInstance} from '../request/config';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        bases: []
    },
    mutations: {
        setBases(state, bases) {
            state.bases = bases;
        }
    },
    actions: {
        async requestBases(context) {
            const value = await reqInstance.get('/base');
            context.commit('setBases', value.data);
        },
        async addBase(context, payload) {
            await reqInstance.post('/base', {
                name: payload.name,
                desc: payload.desc
            });
            await context.dispatch('requestBases');
        },
        async deleteBase(context, payload) {
            await reqInstance.delete(`/base/${payload.id}`);
            await context.dispatch('requestBases');
        },
        async updateBase(context, payload) {
            await reqInstance.put(`/base/${payload.id}`, {
                name: payload.name,
                desc: payload.desc
            });
            await context.dispatch('requestBases');
        }
    }
})
