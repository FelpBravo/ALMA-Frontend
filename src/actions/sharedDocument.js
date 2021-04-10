import { types } from 'types/types';
import { getFileStatus, postDownloadFile, postSharedFile } from 'services/sharedDocumentService';

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

export const clearErrors = () => {
	return {
		type: types.sharedFieldClearErrors,
	}
};

export const startCreateSharedLink = (authUser, fileId, password, expirationDate) => {
	return async (dispatch) => {

		try {
			const resp = await postSharedFile(authUser, fileId, password, expirationDate);
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
			dispatch(saveFileStatus(fileId, resp.data));
		} catch (error) {
			console.log(error);
		}
	}
};

export const startDownloadFile = (fileId, password, fileName, setFile, setLoading) => {
	return async (dispatch) => {

		try {
			const {data} = await postDownloadFile(fileId, password);
			setFile({data, fileName})

		} catch (error) {
			dispatch(saveFileStatus(fileId, { errors: { password: "Contraseña incorrecta" } })); //While backend return errors 

			console.log(error);
		} finally {
			setLoading(false);
		}
	}
};