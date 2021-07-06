import { axiosInstance } from '../config/axios-instance';

const downloadDocument = (authUser, id, version) => {
	return axiosInstance.get(`/files/${id}/download${!version ? '' :`?version=${version}`}`, {
		responseType: 'blob',
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const deleteDocument = (authUser, id) => {
	return axiosInstance.delete(`/files/${id}`, {
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

const uploadDocument = (authUser, files) => {

	const data = new FormData();
	files.forEach(function (file, i) {
		data.append('files', file);
	});

	return axiosInstance.post(`/files/upload`, data, {
		headers: {
			Authorization: `Bearer ${authUser}`,
			'Content-Type': 'multipart/form-data'
		},
	});
}

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

const saveFlowForm = (authUser, fileId, folderId, aspectGroup, tags = []) =>
	axiosInstance.put(`/files/flow/add-metadata`, { fileId, folderId, aspectGroup, tags }, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});

const editForm = (authUser, folderId, fileId, aspectGroup, tags = []) => {

	return axiosInstance.put(`/files/fullDocument`, { folderId, fileId, aspectGroup, tags }, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});

};
const editFLowForm = (authUser, folderId, fileId, aspectGroup, tags = []) => {

	return axiosInstance.post(`/flows/document/`, { folderId, fileId, aspectGroup, tags }, {
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

const getDocumentFlowId = (authUser, instanceId) => {
	return axiosInstance.get(`/flows/document/instance/${instanceId}`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const getDocumentByFlowId = (authUser, flowId) => {
	return axiosInstance.get(`/flows/document/instance/${flowId}`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const editDocumentVersion = (authUser, file, fileId, versioningType, versioningComments) => {

	const data = new FormData();
	data.append('file', file);
	data.append('majorVersion', versioningType);
	data.append('comment', versioningComments);

	return axiosInstance.put(`/files/${fileId}/version`, data, {
		headers: {
			Authorization: `Bearer ${authUser}`,
			'Content-Type': 'multipart/form-data'
		},
	});

};


const getOffice = (authUser, fileId) => {

	return axiosInstance.get(`/files/${fileId}/office`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
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
	getOffice,
	saveFlowForm,
	getDocumentByFlowId,
	getDocumentFlowId,
	editFLowForm,
}