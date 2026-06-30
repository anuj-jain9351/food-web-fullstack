import axios from 'axios';

const api = axios.create({
    // Humne URL ke sath hi '/api' ko jod diya hai!
    baseURL: 'https://food-backend-g332.onrender.com/api',
});

export default api;