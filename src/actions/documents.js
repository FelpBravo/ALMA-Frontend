import { fileBase64 } from 'helpers/fileBase64';
import { getCurrentFolderById } from 'helpers/getCurrentFolderById';
import { getAll, getById } from 'services/aspectGroupsService';
import {
	editDocumentVersion, getDocumentById, getThumbnail, saveForm, uploadDocument, editForm
} from 'services/filesService';
import { getFolders, getFoldersById } from 'services/foldersService';
import { getTags } from 'services/tagsServices';
import Swal from 'sweetalert2';
import { types } from 'types/types';
import { GENERAL_ERROR, KEY_DOC } from '../constants/constUtil';

export const startDocumentsTypeLoading = (authUser) => {
	return async (dispatch) => {

		try {

			const resp = await getAll(authUser);

			dispatch(documentsTypeLoaded(resp.data));

		} catch (error) {
			console.log(error);
		}

	}
};

const documentsTypeLoaded = (documentsType) => {
	return {
		type: types.docsDocumentsTypeLoaded,
		payload: documentsType
	}
};

export const startFoldersLoading = (authUser) => {
	return async (dispatch) => {

		try {

			console.log('gagaga');
			const resp = await getFolders(authUser);

			dispatch(foldersLoaded(resp.data));

			dispatch(addHistoryFoldersBreadcrumbs({ id: 0, name: '#' }));

			dispatch(setCurrentFolderBreadcrumbs({ id: 0, name: '#', folders: [...resp.data] }));

		} catch (error) {
			console.log(error);
		}

	}
};

const foldersLoaded = (folders) => {
	return {
		type: types.docsFoldersLoaded,
		payload: folders
	}
};

export const startDetailDocumentTypeLoading = (id) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await getById(id);

			dispatch(detailDocumentTypeLoaded(resp.data));

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

const detailDocumentTypeLoaded = (folders) => {
	return {
		type: types.docsDetailDocumentTypeLoaded,
		payload: folders
	}
};

export const documentsRemoveAll = () => {
	return {
		type: types.docsRemoveAll,
	}
};

export const removeDetailDocumentType = () => {
	return {
		type: types.docsRemoveDetailDocumentType,
	}
};

export const detailDocumentSetValueField = (sectionId, name, value) => {
	return {
		type: types.docsSetValueField,
		payload: {
			sectionId,
			name,
			value
		}
	}
};

export const startSaveFormLoading = (fileId, folderId, aspectGroup) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			Swal.close();

			await saveForm(fileId, folderId, aspectGroup);

			dispatch(saveFormFinish());

		} catch (error) {
			console.log(error);

			Swal.close();

			const message = error?.response?.data?.message ? error.response.data.message : GENERAL_ERROR;

			Swal.fire({
				title: 'Error', text: message, icon: 'error', heightAuto: false
			});
		}

	}
};

const saveFormFinish = () => {
	return {
		type: types.docsSaveFormFinish,
	}
};

export const documentSaveFolderId = (folderId) => {
	return {
		type: types.docsSaveFolderId,
		payload: folderId,
	}
};

export const documentSaveFolderName = (name) => {
	return {
		type: types.docsSaveFolderName,
		payload: name,
	}
};

export const startDropFileLoading = (files) => {
	return async (dispatch) => {
		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await uploadDocument(KEY_DOC, files[0]);

			Swal.close();

			// SAVE STORE ID LOADED
			dispatch(saveFileIdLoaded(resp.data.id));
			dispatch(saveThumbnailGenerated(resp.data.thumbnailGenerated));

		} catch (error) {
			console.log(error);

			Swal.close();

			const message = error?.response?.data?.message ? error.response.data.message : GENERAL_ERROR;

			Swal.fire({
				title: 'Error', text: message, icon: 'error', heightAuto: false
			});
		}
	}
};

const saveFileIdLoaded = (fileId) => {
	return {
		type: types.docsSaveFileIdLoaded,
		payload: fileId,
	}
};

const saveThumbnailGenerated = (thumbnailGenerated) => {
	return {
		type: types.docsSaveThumbnailGenerated,
		payload: thumbnailGenerated,
	}
};

export const startThumbnailLoading = (fileId) => {
	return async (dispatch) => {

		try {

			const resp = await getThumbnail(fileId);

			dispatch(documentSaveThumbnail(`data:;base64,${fileBase64(resp.data)}`));

		} catch (error) {
			console.log(error);
		}

	}
};

const documentSaveThumbnail = (thumbnail) => {
	return {
		type: types.docsSaveThumbnail,
		payload: thumbnail
	}
};

export const documentsClear = () => {
	return {
		type: types.docsClear,
	}
};

export const startDocumentByIdLoading = (fileId) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await getDocumentById(fileId);

			Swal.close();

			dispatch(documentByIdLoaded(resp.data));

		} catch (error) {
			Swal.close();
			console.log(error);
		}

	}
};

const documentByIdLoaded = ({ aspectGroup, fileId, folderId }) => {
	return {
		type: types.docsDocumentByIdLoaded,
		payload: {
			aspectGroup, fileId, folderId
		}
	}
}

export const startTagsLoading = () => {
	return async (dispatch) => {

		try {

			const resp = await getTags();

			dispatch(tagsLoaded(resp.data));

		} catch (error) {
			console.log(error);
		}

	}
};

const tagsLoaded = (tags) => {
	return {
		type: types.docsTagsLoaded,
		payload: tags,
	}
}

export const saveVersioningType = (type) => {
	return {
		type: types.docsSaveVersioningType,
		payload: type,
	}
};

export const saveVersioningComments = (comments) => {
	return {
		type: types.docsSaveVersioningComments,
		payload: comments,
	}
};

export const clearVersioningType = () => {
	return {
		type: types.docsClearVersioningType,
	}
};

export const clearVersioningComments = () => {
	return {
		type: types.docsClearVersioningComments
	}
};

export const startEditDocumentLoading = (
	files,
	fileId,
	versioningType,
	versioningComments,
	aspectGroup
) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await editDocumentVersion(files[0], fileId, versioningType, versioningComments);

			await editForm(fileId, aspectGroup);

			dispatch(saveFormFinish());

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const openModalSelectFolder = () => {
	return {
		type: types.docsOpenModalSelectFolder,
	}
};

export const closeModalSelectFolder = () => {
	return {
		type: types.docsCloseModalSelectFolder,
	}
};

export const startSubFoldersLoading = (folder) => {
	return async (dispatch, getState) => {

		const { folders } = getState().documents;

		const valueSearch = [];

		getCurrentFolderById(folders, folder.id, valueSearch);

		if (valueSearch.length > 0 && Array.isArray(valueSearch[0].children)) {

			dispatch(setSubFolders(folder.id, valueSearch[0].children));
			dispatch(addHistoryFoldersBreadcrumbs({ ...folder }));
			dispatch(setCurrentFolderBreadcrumbs({ ...folder, folders: valueSearch[0].children }));

		} else {

			try {

				const resp = await getFoldersById(folder.id);

				dispatch(addHistoryFoldersBreadcrumbs({ ...folder }));

				dispatch(setCurrentFolderBreadcrumbs({ ...folder, folders: [...resp.data] }));

				dispatch(setSubFolders(folder.id, resp.data));

			} catch (error) {
				console.log(error);
			}

		}

	}
}

export const addHistoryFoldersBreadcrumbs = (folder) => {
	return {
		type: types.docsSaveHistoryFoldersBreadcrumbs,
		payload: folder,
	}
}

export const setCurrentFolderBreadcrumbs = (currentFolder) => {
	return {
		type: types.docsSaveCurrentFolderBreadcrumbs,
		payload: currentFolder,
	}
}

export const setSubFolders = (folderId, folders) => {
	return {
		type: types.docsSetSubFoldersToFolder,
		payload: {
			folderId,
			folders,
		},
	}
};

export const startSaveCurrentFolderBreadcrumbs = (folderId) => {
	return (dispatch, getState) => {

		const { folders, historyFoldersBreadcrumbs = [] } = getState().documents;

		if (folderId === 0) {

			dispatch(updateHistoryFoldersBreadcrumbs([{ id: 0, name: '#' }]));

			dispatch(setCurrentFolderBreadcrumbs({ id: 0, name: '#', folders: [...folders] }));

		} else {

			const valueSearch = [];

			getCurrentFolderById(folders, folderId, valueSearch);

			const folderSelected = historyFoldersBreadcrumbs.find(history => history.id === folderId);

			const newHistoryFolders = [
				...historyFoldersBreadcrumbs.slice(0, historyFoldersBreadcrumbs.indexOf(folderSelected) + 1)
			];

			dispatch(updateHistoryFoldersBreadcrumbs(newHistoryFolders));

			dispatch(setCurrentFolderBreadcrumbs({
				id: folderId,
				name: valueSearch[0].name,
				folders: valueSearch[0].children
			}));

		}

	}
};

const updateHistoryFoldersBreadcrumbs = (history) => {
	return {
		type: types.docsUpdateHistoryFoldersBreadcrumbs,
		payload: history,
	}
};

