import { axiosInstance } from '../config/axios-instance';

const token = localStorage.getItem('token');

const getFolders = (authUser) => {
	return axiosInstance.get('/folders', {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const getFoldersById = (folderId, authUser) => {
	return axiosInstance.get(`/folders/${folderId}/children`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const getFoldersAdmin = (authUser) => {
	return axiosInstance.get('/folders/admin', {
		headers: {
			Authorization: `Bearer ${authUser}`,
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

const remove = (id) => {
	return axiosInstance.delete(`/folders/admin/${id}`, {
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
	remove,
}