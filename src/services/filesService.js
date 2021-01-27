import { axiosInstance } from '../config/axios-instance';

const downloadDocument = (authUser, id) => {
	return axiosInstance.get(`/files/${id}/download`, {
		responseType: 'blob',
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const deleteDocument = (authUser, id) => {
	return axiosInstance.delete(`/files/${id}/delete`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const subscribeDocument = (authUser, id) => {
	return axiosInstance.post(`/files/${id}/subscribe`, {}, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const uploadDocument = (authUser, file) => {

	const data = new FormData();
	data.append('file', file);

	return axiosInstance.post(`/files/upload`, data, {
		headers: {
			Authorization: `Bearer ${authUser}`,
			'Content-Type': 'multipart/form-data'
		},
	});

};

const getThumbnail = (authUser, id) => {

	return axiosInstance.get(`/files/${id}/thumbnail`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
		responseType: 'arraybuffer'
	});

};

const saveForm = (authUser, fileId, folderId, aspectGroup, tags = []) => {

	return axiosInstance.post(`/files/fullDocument`, { fileId, folderId, aspectGroup, tags }, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});

};

const editForm = (authUser, fileId, aspectGroup, tags = []) => {

	return axiosInstance.post(`/files/fullDocument`, { fileId, aspectGroup, tags }, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});

};

const getDocumentById = (authUser, id) => {
	return axiosInstance.get(`/files/${id}`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const editDocumentVersion = (authUser, file, fileId, versioningType, versioningComments) => {

	const data = new FormData();
	data.append('file', file);
	data.append('fileId', fileId);
	data.append('majorVersion', versioningType);
	data.append('comment', versioningComments);

	return axiosInstance.put(`/files/new-version`, data, {
		headers: {
			Authorization: `Bearer ${authUser}`,
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
	editForm,
}