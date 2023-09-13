import axios from 'axios';
import { getUserLocalStorage } from '../contexts/utils';

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API,
});

api.interceptors.request.use((config) => {
    const user = getUserLocalStorage();

    config.headers.Authorization = user?.token;

    return config;
});

export const useApi = () => ({
    signIn: async (user) => {
        const request = await api.post('/sign-in', user);
        return request.data;
    },
    signUp: async (user) => {
        await api.post('/sign-up', user);
    },
    signOut: async (config) => {
        await api.delete('/sign-out', config);
    },
    getTransactions: async (config) => {
        const response = await api.get('/transactions', config);
        return response;
    },
    createTransaction: async (transaction, config) => {
        await api.post('/transactions', transaction, config);
    },
    deleteTransaction: async (transactionId, config) => {
        await api.delete(`/transactions/${transactionId}`, config);
    },
});
