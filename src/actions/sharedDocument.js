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

export const startDownloadFile = (fileId, password, fileName, setCanDownload) => {
	return async (dispatch) => {

		try {
			const resp = await postDownloadFile(fileId, password);
			setCanDownload(true)
			FileSaver.saveAs(resp.data, "file.png");

		} catch (error) {
			dispatch(saveFileStatus(fileId, { errors: { password: "Contraseña incorrecta" } })); //While backend return errors 

			console.log(error);
		}
	}
};