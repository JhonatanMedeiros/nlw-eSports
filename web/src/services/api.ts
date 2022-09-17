import axios from 'axios';

const api = axios.create({
	baseURL: 'https://nlw-esports-server.onrender.com/'
});

export default api;
