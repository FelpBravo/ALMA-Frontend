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

const uploadDocument = (folderId, file) => {

	const data = new FormData();
	data.append('folderId', folderId);
	data.append('file', file);

	return axiosInstance.post(`/files/upload`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'multipart/form-data'
		},
	});

};

const getThumbnail = (id) => {

	return axiosInstance.get(`/files/${id}/thumbnail`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		responseType: 'arraybuffer'
	});

};

const saveForm = (fileId, folderId, aspectGroup, tags = []) => {
	//console.log(JSON.stringify({ fileId, folderId, aspectGroup, tags }));
	return axiosInstance.post(`/files/fullDocument`, { fileId, folderId, aspectGroup, tags }, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

};

const getDocumentById = (id) => {
	return axiosInstance.get(`/files/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const editDocumentVersion = (file, fileId, versioningType, versioningComments) => {

	const data = new FormData();
	data.append('file', file);
	data.append('fileId', fileId);
	data.append('majorVersion', versioningType);
	data.append('comment', versioningComments);

	return axiosInstance.put(`/files/new-version`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'multipart/form-data'
		},
	});

};


export {
	downloadDocument,
	deleteDocument,
	subscribeDocument,
	uploadDocument,
	getThumbnail,
	saveForm,
	getDocumentById,
	editDocumentVersion,
}