import { axiosInstance } from '../config/axios-instance';

const token = localStorage.getItem('token');

const getTags = () => {
	return axiosInstance.get('/tags/', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export {
	getTags,
}