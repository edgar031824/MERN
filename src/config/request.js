import axios from 'axios';

const baseRequest = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL
})

export default baseRequest;