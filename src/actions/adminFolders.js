import { INIT_FOLDER } from 'constants/constUtil';
import { getCurrentFolderById } from 'helpers/getCurrentFolderById';
import { create, edit, getFoldersAdmin, getFoldersAdminById } from 'services/foldersService';
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

			const resp = await getFoldersAdmin();

			dispatch(foldersLoaded(resp.data));
			dispatch(saveHistory(0, INIT_FOLDER));
			dispatch(saveCurrentFolders(0, INIT_FOLDER, resp.data));

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
	return async (dispatch, getState) => {

		const { folders, currentFolders } = getState().adminFolders;

		if (currentFolders.id === folderId) {

			const resp = await getFoldersAdminById(folderId);
			dispatch(subFoldersLoaded(folderId, resp.data));
			dispatch(saveCurrentFolders(folderId, name, resp.data));

		} else {

			const valueSearch = [];

			getCurrentFolderById(folders, folderId, valueSearch);

			if (valueSearch.length > 0 && Array.isArray(valueSearch[0].children)) {

				dispatch(subFoldersLoaded(folderId, valueSearch[0].children));
				dispatch(saveHistory(folderId, name));
				dispatch(saveCurrentFolders(folderId, name, valueSearch[0].children));

			} else {

				try {

					Swal.fire({
						title: 'Loading...',
						text: 'Please wait...',
						allowOutsideClick: false,
						heightAuto: false,
					});

					Swal.showLoading();

					const resp = await getFoldersAdminById(folderId);

					dispatch(subFoldersLoaded(folderId, resp.data));
					dispatch(saveHistory(folderId, name));
					dispatch(saveCurrentFolders(folderId, name, resp.data));

				} catch (error) {
					console.log(error);
				} finally {
					Swal.close();
				}

			}

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

const saveCurrentFolders = (folderId, name, folders) => {
	return {
		type: types.adminFoldersSaveCurrentFolders,
		payload: {
			folderId,
			name,
			folders,
		},
	}
};

export const startSaveCurrentFolder = (folderId) => {
	return (dispatch, getState) => {

		const { folders, historyFolders = [] } = getState().adminFolders;

		if (folderId === 0) {

			dispatch(saveCurrentFolders(0, INIT_FOLDER, folders));
			dispatch(updateListHistory([{ id: 0, name: INIT_FOLDER }]));

		} else {

			const valueSearch = [];

			getCurrentFolderById(folders, folderId, valueSearch);

			const folderSelected = historyFolders.find(history => history.id === folderId);

			const newHistoryFolders = [
				...historyFolders.slice(0, historyFolders.indexOf(folderSelected) + 1)
			];

			dispatch(updateListHistory(newHistoryFolders));

			dispatch(saveCurrentFolders(folderId, valueSearch[0].name, valueSearch[0].children));

		}

	}
};

const updateListHistory = (history) => {
	return {
		type: types.adminFoldersUpdateListHistory,
		payload: history,
	}
};

export const openModalFolder = () => {
	return {
		type: types.adminFoldersOpenModal,
	}
};

export const closeModalFolder = () => {
	return {
		type: types.adminFoldersCloseModal,
	}
};

export const setActionModal = (type) => {
	return {
		type: types.adminFoldersSetActionModal,
		payload: type,
	}
};

export const setRemoveActionModal = () => {
	return {
		type: types.adminFoldersRemoveActionModal,
	}
};

export const setFolder = (folder) => {
	return {
		type: types.adminFoldersSetFolder,
		payload: folder,
	}
};

export const startSaveFolderLoading = (data, folderId, name) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await create(data);

			dispatch(startSubFoldersLoading(folderId, name));
			dispatch(saveFolderLoaded());
			dispatch(closeModalFolder());

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

const saveFolderLoaded = () => {
	return {
		type: types.adminFoldersSaveLoaded,
	}
}

export const startEditFolderLoading = (data, folderId, name) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await edit(data);

			//dispatch(startSubFoldersLoading(folderId, name));
			dispatch(saveFolderLoaded());
			dispatch(closeModalFolder());

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};
