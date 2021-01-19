import { getFolders, getFoldersById } from 'services/foldersService';
import Swal from 'sweetalert2';
import { types } from 'types/types';

export const startFoldersLoading = () => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await getFolders();

			dispatch(foldersLoaded(resp.data));
			dispatch(saveHistory(0, 'Administración'));
			dispatch(saveCurrentFolders(0, resp.data));

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const foldersLoaded = (folders) => {
	return {
		type: types.adminFoldersLoaded,
		payload: folders,
	}
};

export const startSubFoldersLoading = (folderId, name) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await getFoldersById(folderId);

			dispatch(subFoldersLoaded(folderId, resp.data));
			dispatch(saveHistory(folderId, name));
			dispatch(saveCurrentFolders(folderId, resp.data));

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

const subFoldersLoaded = (folderId, folders) => {
	return {
		type: types.adminFoldersSubFoldersLoaded,
		payload: {
			folderId,
			folders,
		},
	}
};

const saveHistory = (folderId, name) => {
	return {
		type: types.adminFoldersSaveHistory,
		payload: {
			folderId,
			name,
		}
	}
};

const saveCurrentFolders = (folderId, folders) => {
	return {
		type: types.adminFoldersSaveCurrentFolders,
		payload: {
			folderId,
			folders,
		},
	}
};

export const startSaveCurrentFolder = (folderId) => {
	return (dispatch, getState) => {

		const { folders, historyFolders = [] } = getState().adminFolders;

		if (folderId === 0) {

			dispatch(saveCurrentFolders(0, folders));
			dispatch(updateListHistory([{ id: 0, name: 'Administración' }]));

		} else {

			const resp = getFolderById(folders, folderId);
			const folderSelected = historyFolders.find(history => history.id === folderId);

			if (historyFolders.indexOf(folderSelected) !== historyFolders.length - 1) {
				const newHistoryFolders = [...historyFolders.slice(0, historyFolders.length - 1)];
				dispatch(updateListHistory(newHistoryFolders));
			}

			dispatch(saveCurrentFolders(folderId, resp.children));

		}

	}
}

const updateListHistory = (history) => {
	return {
		type: types.adminFoldersUpdateListHistory,
		payload: history,
	}
}

const getFolderById = (folders = [], folderId) => {

	for (const folder of folders) {

		if (folder.id == folderId) {

			return folder;

		} else if (Array.isArray(folder.children)) {

			return getFolderById(folder.children, folderId);

		}

	}
}