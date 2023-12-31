import { getFileStatus, postDownloadFile, postSharedFile } from 'services/sharedDocumentService';
import { types } from 'types/types';
import React from 'react';
import IntlMessages from 'util/IntlMessages';

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

const fileNotFound = (documentId, data) => {
	return {
		type: types.sharedFileNotFoundError,
		payload: {}
	}
};


export const clearErrors = () => {
	return {
		type: types.sharedFileClearErrors,
	}
};

export const clearValues = () => {
	return {
		type: types.sharedFileClearValues,
		payload: {}
	}
};
export const startCreateSharedLink = (authUser, fileId, password, expirationDate, callback) => {
	return async (dispatch) => {

		try {
			const resp = await postSharedFile(authUser, fileId, password, expirationDate);
			dispatch(saveSharedFile(resp.data, fileId));
			callback && callback()
		} catch (error) {
			console.log(error);
		}
	}
};

export const startVerifyFile = (fileId) => {
	return async (dispatch) => {

		try {
			const resp = await getFileStatus(fileId);
			dispatch(saveFileStatus(fileId, resp.data));
		} catch (error) {
			const status = error?.response?.status
			if (status === 404){
				dispatch(fileNotFound())
			}
			console.log(error);
		}
	}
};

export const startDownloadFile = (fileId, password, fileName, file, setFile, setLoading, setGoDownload, directDownload) => {
	return async (dispatch) => {

		try {
			if (!file) {
				const { data } = await postDownloadFile(fileId, password);
				setFile({ data, fileName })
			}

		} catch (error) {
			dispatch(saveFileStatus(fileId, { errors: { password: <IntlMessages id="shared.incorrect.password" /> } })); //While backend return errors 
		} finally {
			setLoading(false);
			setGoDownload(directDownload)
		}
	}
};