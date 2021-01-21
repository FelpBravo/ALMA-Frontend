import { axiosInstance } from '../config/axios-instance';

const token = localStorage.getItem('token');

const getFolders = () => {
	return axiosInstance.get('/folders', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const getFoldersById = (folderId) => {
	return axiosInstance.get(`/folders/${folderId}/children`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const getFoldersAdmin = () => {
	return axiosInstance.get('/folders/admin', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const getFoldersAdminById = (folderId) => {
	return axiosInstance.get(`/folders/admin/${folderId}/children`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const create = (data) => {
	return axiosInstance.post('/folders/admin', data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const edit = (data) => {
	return axiosInstance.put('/folders/admin', data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export {
	getFolders,
	getFoldersById,
	getFoldersAdmin,
	getFoldersAdminById,
	create,
	edit,
}