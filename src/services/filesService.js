import { axiosInstance } from '../config/axios-instance';

const token = localStorage.getItem('token');

const downloadDocument = (id) => {
	return axiosInstance.get(`/files/${id}/download`, {
		responseType: 'blob',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const deleteDocument = (id) => {
	return axiosInstance.delete(`/files/${id}/delete`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const subscribeDocument = (id) => {
	return axiosInstance.get(`/files/${id}/subscribe`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export {
	downloadDocument,
	deleteDocument,
	subscribeDocument,
}