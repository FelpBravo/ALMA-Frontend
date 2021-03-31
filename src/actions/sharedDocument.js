import { types } from 'types/types';
import { getFileStatus, postDownloadFile, postSharedFile } from 'services/sharedDocumentService';
import FileSaver from 'file-saver';

export const sharedDocumentSetValue = (name, value) => {
	return {
		type: types.sharedDocumentSetValue,
		payload: {
			name,
			value,
		}
	}
};

const saveSharedFile = (token, documentId) => {
	return {
		type: types.saveSharedFile,
		payload: {
			token,
			documentId,
		}
	}
};

const saveFileStatus = (documentId, data) => {
	return {
		type: types.saveFileStatus,
		payload: {
			documentId,
			...data,
		}
	}
};

export const startCreateSharedLink = (authUser, fileId, password, expirationDate) => {
	return async (dispatch) => {

		try {
			const resp = await postSharedFile(authUser, fileId, password, expirationDate);
			console.log("resp", resp)
			dispatch(saveSharedFile(resp.data, fileId));
		} catch (error) {
			console.log(error);
		}
	}
};

export const startVerifyFile = (fileId) => {
	return async (dispatch) => {

		try {
			const resp = await getFileStatus(fileId);
			dispatch(saveFileStatus(fileId,resp.data));
		} catch (error) {
			console.log(error);
		}
	}
};

export const startDownloadFile = (fileId, password) => {
	return async (dispatch) => {

		try {
			const resp = await postDownloadFile(fileId, password);
			FileSaver.saveAs(resp.data, "example.pdf");

		} catch (error) {
			console.log(error);
		}
	}
};