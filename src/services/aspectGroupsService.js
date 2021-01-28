import { axiosInstance } from '../config/axios-instance';

const getAll = (authUser) => {
	return axiosInstance.get('/aspectGroups', {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const getById = (authUser, id) => {
	return axiosInstance.get(`/aspectGroups/${id}/aspects`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

export {
	getAll,
	getById,
}