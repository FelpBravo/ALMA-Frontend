import { axiosInstance } from '../config/axios-instance';

const getAll = (authUser) => {
	return axiosInstance.get('/aspects', {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const getById = (authUser, id) => {
	return axiosInstance.get(`/aspects/${id}/aspects`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

export {
	getAll,
	getById,
}