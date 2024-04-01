import { createStore } from 'vuex';
import axios from 'axios';

const apiURL = 'http://localhost:8000'

const store = createStore({
    state() {
        return {
            expenses: [],
            isLoading: false,
        }
    },
    mutations: {
        setExpenses(state, data) {
            state.expenses = data;
        },
        setIsLoading(state, value) {
            state.isLoading = value
        }
    },
    actions: {
        async getExpenses({ commit }) {

            commit('setIsLoading', true)
            const res = await axios.get(`${apiURL}/expense`);
            commit('setIsLoading', false)

            commit('setExpenses', res.data.expenses)
        },
        async deleteExpense({ dispatch }, { id }) {
            await axios.delete(`${apiURL}/expense/${id}`);
            dispatch('getExpenses')
        },
        async createExpense({ dispatch }, { title, amount }) {
            await axios.post(`${apiURL}/expense/`, {
                title, amount
            });
            dispatch('getExpenses')
        },
        async updateExpense({ dispatch }, { id, title, amount }) {
            await axios.patch(`${apiURL}/expense/${id}`, {
                title, amount
            });
            dispatch('getExpenses')
        }
    },
    getters: {
        getTotal(state) {
            return state.expenses.reduce((n, { amount }) => n + Number(amount), 0)
        },
        getExpenses(state) {
            return state.expenses;
        }
    },
});

export default store;