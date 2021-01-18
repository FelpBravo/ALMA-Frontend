import axios from 'axios';

const axiosInstance = axios.create({

	baseURL: process.env.REACT_APP_URL_API,

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