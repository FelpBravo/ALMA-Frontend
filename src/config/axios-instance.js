import axios from 'axios';

const axiosInstance = axios.create({

	baseURL: 'http://192.168.218.105:9090/middleware',

});

axiosInstance.interceptors.response.use(
	(response) => {

		return response;

	}
	,
	(error) => {

		if (error && error.response && (error.response.status === 401 || error.response.status === 403)) {

		}

		return Promise.reject(error);

	});

export {
	axiosInstance,
}