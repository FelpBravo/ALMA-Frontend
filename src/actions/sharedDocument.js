import { types } from 'types/types';
import { postSharedFile } from 'services/sharedDocumentService';

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