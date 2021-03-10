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
import { GENERAL_ERROR } from '../constants/constUtil';


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

			const resp = await getFolders(authUser);

			dispatch(foldersLoaded(resp.data));

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
	return async (dispatch, getState) => {

		const { authUser } = getState().auth;

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await getById(authUser, id);

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

///
export const startSaveFormLoading = (fileId, folderId, aspectGroup, tags) => {
	return async (dispatch, getState) => {

		const { authUser } = getState().auth;

		try {

			Swal.fire({
				icon: 'success',
				title: 'Documento cargado con exito',
				showConfirmButton: false,
				timer: 1500
			})

			Swal.showLoading();

			await saveForm(authUser, fileId, folderId, aspectGroup, tags);

			Swal.close();

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
	return async (dispatch, getState) => {

		const { authUser } = getState().auth;

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await uploadDocument(authUser, files);

			Swal.close();

			// SAVE STORE ID LOADED
			// documentsType , thumbnailGenerated
			//for
			console.log('resp', resp)
			resp.forEach( res => dispatch(saveFileIdLoaded(
				{
					documentsType: res.data.id,
					thumbnailGenerated: res.data.thumbnailGenerated
				})))
			// dispatch(saveFileIdLoaded(resp.data.id));
			// dispatch(saveThumbnailGenerated(resp.data.thumbnailGenerated));

		} catch (error) {

			dispatch(documentsClear())

			console.log(error);

			Swal.close();

			const message = error?.response?.data?.message ? error.response.data.message : GENERAL_ERROR;

			Swal.fire({
				title: 'Error', text: message, icon: 'error', heightAuto: false
			});
		}
	}
};

const saveFileIdLoaded = (fileObject) => {
	return {
		type: types.docsListSaveFileIdLoaded,
		payload: fileObject,
	}
};

const saveThumbnailGenerated = (thumbnailGenerated) => {
	return {
		type: types.docsSaveThumbnailGenerated,
		payload: thumbnailGenerated,
	}
};

export const startThumbnailLoading = (fileId) => {
	return async (dispatch, getState) => {

		const { authUser } = getState().auth;

		try {

			const resp = await getThumbnail(authUser, fileId);

			dispatch(documentSaveThumbnail(`data:;base64,${fileBase64(resp.data)}`));

		} catch (error) {
			console.log(error);
			dispatch(documentsClear())
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

export const startDocumentByIdLoading =  (fileId) => {
	return async (dispatch, getState) => {

		const { authUser } = getState().auth;

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await getDocumentById(authUser, fileId);

			Swal.close();

			dispatch(documentByIdLoaded(resp.data));


		} catch (error) {
			Swal.close();
			console.log(error);
			dispatch(documentsClear())
		}

	}
};   

const documentByIdLoaded = ({ path, aspectGroup, fileId, folderId, name, tags = [], signatures = []}) => {
	return {
		type: types.docsDocumentByIdLoaded,
		payload: {
			aspectGroup, fileId, folderId, tags, path, name, signatures
		}
	}
};

export const startDocumentByIdVisibility = (id) => {
	return async (dispatch, getState) => {

		const { authUser } = getState().auth;

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await getDocumentById(authUser, id);

			Swal.close();

			dispatch(documentVisibility(resp.data));

		} catch (error) {
			Swal.close();
			console.log(error);
			dispatch(documentsClear())
		}

	}
};

const documentVisibility = (docs) => {
	return {
		type: types.docsDocumentByIdVisibility,
		payload: docs,
	}
}


export const startTagsLoading = (authUser) => {
	return async (dispatch) => {

		try {

			const resp = await getTags(authUser);

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
export const clearFolderIdOrigin = (folderId) => {
	return async (dispatch) => {
		dispatch(saveclearFolderIdOrigin(folderId))
	}
}

export const saveclearFolderIdOrigin = (folderId) =>{
	return {
		type: types.clearFolderIdOrigin,
		payload: folderId
	}
}

export const getpathFolderName = (folderName) => {
	return async (dispatch, getState) => {
		const { historyFoldersBreadcrumbs } = getState().documents;
		const pathselect = historyFoldersBreadcrumbs.filter(folder => folder.name != '#')
		let path = '/'
		pathselect.map((folder) => {
			path = path+folder.name + '/'
		})
		path = path + folderName 
		dispatch(savepathFolderName(path))
	}
}

export const savepathFolderName = (path) =>{
	return {
		type: types.pathFolderName,
		payload: path
	}
}


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
	folderId,
	files,
	fileId,
	versioningType,
	versioningComments,
	aspectGroup,
	tags
) => {
	return async (dispatch, getState) => {

		const { authUser } = getState().auth;

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			if (files) {

				await editDocumentVersion(
					authUser,
					files[0],
					fileId,
					versioningType,
					versioningComments
				);

			}

			await editForm(authUser,folderId, fileId, aspectGroup, tags);

			dispatch(saveFormFinish());

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const startSubFoldersLoading = (folder, authUser) => {
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

				dispatch(docsLoadingModalFolder());

				const resp = await getFoldersById(folder.id, authUser);

				dispatch(addHistoryFoldersBreadcrumbs({ ...folder }));

				dispatch(setCurrentFolderBreadcrumbs({ ...folder, folders: [...resp.data] }));

				dispatch(setSubFolders(folder.id, resp.data));

			} catch (error) {
				console.log(error);
			} finally {
				dispatch(docsLoadingModalFolder());
			}

		}
		

		

	}
}

const docsLoadingModalFolder = () => {
	return {
		type: types.docsLoadingModalFolder,
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

export const startAddAndRemoveTag = (id) => {
	return (dispatch, getState) => {

		const { tagsSelected, tags = [] } = getState().documents;

		const existsTag = tagsSelected.find(x => x.id === parseInt(id));

		let newTags = [];

		if (!existsTag) {

			const tag = tags.find(x => x.id === parseInt(id));

			newTags = [...tagsSelected, { ...tag }];

		} else {

			newTags = tagsSelected.filter(tag => tag.id !== parseInt(id));

		}

		dispatch(addAndRemoveTagLoaded(newTags));

	}
};

const addAndRemoveTagLoaded = (tags) => {
	return {
		type: types.docsAddAndRemoveTag,
		payload: tags,
	}
}

