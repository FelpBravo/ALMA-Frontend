import { getFolders, getFoldersById } from 'services/foldersService';
import { types } from 'types/types';

export const startFoldersInitLoading = (authUser) => {
	return async (dispatch) => {

		try {

			const resp = await getFolders(authUser);

			dispatch(foldersInitLoaded(resp.data));

		} catch (error) {
			console.log(error);
		}

	}
};

export const foldersInitLoaded = (folders) => {
	return {
		type: types.foldersInitLoaded,
		payload: folders,
	}
};

export const startFoldersSetChildren = (folderId) => {
	return async (dispatch) => {

		try {

			const resp = await getFoldersById(folderId);

			dispatch(foldersSetChildren(folderId, resp.data));

		} catch (error) {
			console.log(error);
		}

	}
};

export const foldersSetChildren = (folderId, folders) => {
	return {
		type: types.foldersSetChildren,
		payload: {
			id: folderId,
			folders,
		},
	}
};

export const saveFoldersId = (folderId) => {
	return {
		type: types.foldersSaveIds,
		payload: folderId,
	}
};

export const removeFoldersId = (folderId) => {
	return {
		type: types.foldersRemoveId,
		payload: folderId,
	}
};

export const saveAllFolders = (folders) => {
	return {
		type: types.foldersSaveAll,
		payload: folders,
	}
}

export const folderSelected = (folderId) => {
	return {
		type: types.foldersSelected,
		payload: folderId,
	}
}

export const folderRemoveAll = () => {
	return {
		type: types.foldersRemoveAll,
	}
}