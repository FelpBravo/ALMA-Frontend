import { axiosInstance } from '../config/axios-instance';

const token = localStorage.getItem('token');

const getAll = () => {
	return axiosInstance.get('/aspectGroups', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const getById = (id) => {
	return axiosInstance.get(`/aspectGroups/${id}/aspects`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export {
	getAll,
	getById,
}