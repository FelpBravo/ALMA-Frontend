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

export {
	getFolders,
	getFoldersById
}