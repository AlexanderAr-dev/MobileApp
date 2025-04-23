import axios from 'axios';
import {IExpense} from "../types/IExpense";

const API_URL = 'http://10.0.2.2:3000'; // Эмулятор Android
export const seedDatabase = () => axios.post(`${API_URL}/seed`);
export const api = {
    seedDatabase: () => axios.post(`${API_URL}/seed`),
    // === MONTHS ===
    getAllMonths: () => axios.get(`${API_URL}/months`),
    getMonthById: (id: number) => axios.get(`${API_URL}/months/${id}`),

    // === DAYS ===
    getDaysByMonthId: (monthId: number) => axios.get(`${API_URL}/months/${monthId}/days`),
    getDayById: (id: number) => axios.get(`${API_URL}/days/${id}`),

    // === EXPENSES ===
    getExpensesByDayId: (dayId: number) => axios.get(`${API_URL}/days/${dayId}/expenses`),
    getExpenseById: (id: number) => axios.get(`${API_URL}/expenses/${id}`),
    createExpense: (data: IExpense) => axios.post(`${API_URL}/expenses`, data),
    updateExpense: (id: number, data: any) => axios.put(`${API_URL}/expenses/${id}`, data),
    deleteExpense: (id: number) => axios.delete(`${API_URL}/expenses/${id}`),
};
