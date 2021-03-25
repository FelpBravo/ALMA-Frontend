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

const getFoldersAdminById = (authUser, folderId) => {
	return axiosInstance.get(`/folders/admin/${folderId}/children`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const getTypesFolders = (authUser,id) => {
	return axiosInstance.get(`/folders/admin/${id}/folderTypes`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const create = (authUser, data) => {
	return axiosInstance.post('/folders/admin', data, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const edit = (authUser, data) => {
	return axiosInstance.put('/folders/admin', data, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const remove = (authUser, id) => {
	return axiosInstance.delete(`/folders/admin/${id}`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

export {
	getFolders,
	getFoldersById,
	getFoldersAdmin,
	getFoldersAdminById,
	getTypesFolders,
	create,
	edit,
	remove,
}