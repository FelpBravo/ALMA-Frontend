import Swal from 'sweetalert2';

import { GENERAL_ERROR, INIT_FOLDER } from 'constants/constUtil';
import { getCurrentFolderById } from 'helpers/getCurrentFolderById';
import { removeFolder } from 'helpers/removeFolder';
import { create, edit, getFoldersAdmin, getFoldersAdminById, getGroups, getTypesFolders, getValidateFolders, remove } from 'services/foldersService';
import { types } from 'types/types';

export const startFoldersLoading = (authUser) => {
	return async (dispatch) => {
		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await getFoldersAdmin(authUser);

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

export const startUpdateFolderLoading = (authUser, data, folderId, parentId) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();
			if (folderId === 0) {
				await create(authUser, data).then(async () => {
					const resp = await getFoldersAdmin(authUser);
					dispatch(updateFoldersCurrentLoaded(parentId, resp.data))
				})

			}
			else {
				await create(authUser, data).then(async () => {
					const resp = await getFoldersAdminById(authUser, folderId);
					dispatch(updateFoldersCurrentLoaded(parentId, resp.data))
				})
			}



		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const updateFoldersCurrentLoaded = (parentId, folders, start) => {
	return {
		type: types.adminFoldersUpdateCurrentFolders,
		payload: {
			parentId,
			folders,
			start
		}
	}
};

export const foldersLoaded = (folders) => {
	return {
		type: types.adminFoldersLoaded,
		payload: folders,
	}
};

export const startSubFoldersLoading = (authUser, folderId, name) => {
	return async (dispatch, getState) => {

		const { folders } = getState().adminFolders;

		const valueSearch = [];

		getCurrentFolderById(folders, folderId, valueSearch);

		if (valueSearch.length > 0 && Array.isArray(valueSearch[0].children)) {

			dispatch(subFoldersLoaded(folderId, valueSearch[0].children));
			dispatch(saveHistory(folderId, name));
			dispatch(saveCurrentFolders(folderId, name, valueSearch[0].children));

		} else {

			try {

				Swal.fire({
					title: 'Cargando...',
					text: 'Por favor espere...',
					allowOutsideClick: false,
					heightAuto: false,
				});

				Swal.showLoading();

				const resp = await getFoldersAdminById(authUser, folderId);

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

export const startSaveCurrentFolder = (authUser, folderId, name) => {
	return async (dispatch, getState) => {

		const { historyFolders = [] } = getState().adminFolders;

		if (folderId === 0) {
			const resp = await getFoldersAdmin(authUser);
			dispatch(updateFoldersCurrentLoaded(folderId, resp.data))
			dispatch(foldersLoaded(resp.data));
			dispatch(saveCurrentFolders(folderId, name, resp.data));
			dispatch(updateListHistory([{ id: 0, name: INIT_FOLDER }]));

		} else {

			const resp = await getFoldersAdminById(authUser, folderId);
			dispatch(updateFoldersCurrentLoaded(folderId, resp.data))

			const folderSelected = historyFolders.find(history => history.id === folderId);
			const newHistoryFolders = [
				...historyFolders.slice(0, historyFolders.indexOf(folderSelected) + 1)
			];

			dispatch(updateListHistory(newHistoryFolders));
			dispatch(saveCurrentFolders(folderId, name, resp.data));





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

export const startCreateFolderLoading = (authUser, data, folderId, name) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await create(authUser, data);

			Swal.close();

			dispatch(startSubFolderLoadingAfterCrete(authUser, folderId, name));

		} catch (error) {
			Swal.close();
			console.log(error);
		}

	}
};

export const startSubFolderLoadingAfterCrete = (authUser, folderId, name) => {
	return async (dispatch, getState) => {

		const { currentFolders } = getState().adminFolders;

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await getFoldersAdminById(authUser, folderId);

			dispatch(subFoldersLoaded(folderId, resp.data));

			if (currentFolders.id !== folderId) {
				dispatch(saveHistory(folderId, name));
			}

			dispatch(saveCurrentFolders(folderId, name, resp.data));

			dispatch(saveFolderLoaded());

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

export const startEditFolderLoading = (authUser, data, folderId, name) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await edit(authUser, data, folderId).then(async () => {
				const resp = await getFoldersAdmin(authUser);
				dispatch(foldersLoaded(resp.data));
				dispatch(saveCurrentFolders(0, INIT_FOLDER, resp.data));
				dispatch(saveCurrentFolders(folderId, name, resp.data));

			})
			dispatch(updateLoaded(data));
			dispatch(saveFolderLoaded());

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

const updateLoaded = (data) => {
	return {
		type: types.adminFoldersUpdateLoaded,
		payload: data,
	}
};

export const adminFoldersremoveAll = () => {
	return {
		type: types.adminFoldersRemoveAll,
	}
};

export const startDeleteFolderLoading = (authUser, folderId, parentId) => {
	return async (dispatch, getState) => {

		const { folders, currentFolders } = getState().adminFolders;
		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await remove(authUser, folderId).then(async () => {
				if (parentId === 0) {
					const resp = await getFoldersAdmin(authUser, parentId);
					dispatch(updateFoldersCurrentLoaded(parentId, resp.data))
				}
				else {
					const resp = await getFoldersAdminById(authUser, parentId);
					dispatch(updateFoldersCurrentLoaded(parentId, resp.data))
				}

			})

			Swal.close();



		} catch (error) {
			Swal.close();

			const message = error?.response?.data?.message ? error.response.data.message : GENERAL_ERROR;

			Swal.fire({
				title: 'Error', text: message, icon: 'error', heightAuto: false
			});
		}

	}
};

export const validateFolders = (authUser, folder_name) => {
	return async (dispatch) => {
		try {
			const resp = await getValidateFolders(authUser, folder_name)
			dispatch(foldersValidate(resp.data.exists))
		} catch (error) {
			console.log(error);
		}
	}
};

export const foldersValidate = (foldersName) => {
	return {
		type: types.foldersValidateName,
		payload: foldersName,
	}
};

export const deleteFolderLoaded = (folders, currentFolders) => {
	return {
		type: types.adminFoldersDeleteFolderLoaded,
		payload: {
			folders,
			currentFolders: {
				folders: currentFolders,
			}
		}
	}
}

export const startFoldersTypesLoading = (authUser, id) => {
	return async (dispatch) => {

		try {

			const resp = await getTypesFolders(authUser, id);

			dispatch(foldersTypesLoaded(resp.data));

		} catch (error) {
			console.log(error);
		}

	}
};

export const startGroupsListLoading = (authUser) => {
	return async (dispatch) => {

		try {

			const resp = await getGroups(authUser);

			dispatch(groupListLoaded(resp.data));

		} catch (error) {
			console.log(error);
		}

	}
};

export const foldersTypesLoaded = (foldersTypes) => {
	return {
		type: types.adminfoldersTypesLoaded,
		payload: foldersTypes,
	}
};

export const groupListLoaded = (groupList) => {
	return {
		type: types.adminfoldersGroupListLoaded,
		payload: groupList,
	}
};


