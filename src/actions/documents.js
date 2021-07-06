import { get } from 'lodash';
import moment from 'moment';
import Swal from 'sweetalert2';

import { fileBase64 } from 'helpers/fileBase64';
import { getCurrentFolderById } from 'helpers/getCurrentFolderById';
import { getAll, getById } from 'services/aspectGroupsService';
import { editDocumentVersion, editFLowForm, editForm, getDocumentByFlowId, getDocumentById, getDocumentFlowId, getOffice, getThumbnail, saveFlowForm, saveForm, uploadDocument } from 'services/filesService';
import { getFolders, getFoldersById } from 'services/foldersService';
import { getTags } from 'services/tagsServices';
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
export const startSaveFormLoading = (fileId, folderId, aspectGroup, tags, reset) => {
	return async (dispatch, getState) => {

		const { authUser } = getState().auth;

		try {

			// Swal.fire({
			// 	icon: 'success',
			// 	title: 'Documento cargado con exito',
			// 	showConfirmButton: false,
			// 	timer: 1500
			// })

			Swal.showLoading();

			const response = await saveForm(authUser, fileId, folderId, aspectGroup, tags);
			Swal.fire({
				icon: 'success',
				width: 700,
				title: '<h4>AlmaID Generado con éxito</h4>',
				html: `<ul>${response.data.map(({ name, id }) => `<li><h6><b>${id}</b>    ${name}</h6></li>`)}</ul>`,
				showConfirmButton: true,
			})
			// Swal.close();

			dispatch(saveFormFinish());
			reset()

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

export const startSaveFormFlowLoading = (fileId, folderId, aspectGroup, tags, reset, callback) => {
	return async (dispatch, getState) => {

		const { authUser } = getState().auth;

		try {

			Swal.showLoading();

			const response = await saveFlowForm(authUser, fileId, folderId, aspectGroup, tags);
			callback()
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

export const saveFormFinish = () => {
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

export const documentRemoveFile = filesLoaded => {
	return {
		type: types.docsRemoveFile,
		payload: filesLoaded,
	}
}


export const startDropFileLoading = (files) => {
	return async (dispatch, getState) => {

		const { authUser } = getState().auth;
		const documentsList = getState().documents.filesLoaded


		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			if (files.length > 0) {
				let position = []
				files.map((file, index) => {
					documentsList.map((doc) => {
						if (file.name === doc.name) {
							position.push(index)
						}
					})
				})
				if (position.length > 0) {
					position.reverse().map((index) => {
						files.splice(index, 1)
					})

				}
			}

			if (files.length > 0) {


				const resp = await uploadDocument(authUser, files);

				Swal.close();

				// SAVE STORE ID LOADED
				let err2 = ''
				resp.data.forEach((res) => {
					if (res.message) {
						err2 = err2 + "</br> " + res.message
					} else {
						dispatch(saveFileIdLoaded(
							{
								fileIdLoaded: res.fileId,
								// thumbnailGenerated: res.thumbnailGenerated,
								thumbnailGenerated: true,

								name: res.name,
							})

						)
					}
				}
				)

				if (err2.length > 0) {
					Swal.fire({
						title: "Error, The document is already exists", html: err2, icon: 'error', heightAuto: false
					});
				}
				// dispatch(saveFileIdLoaded(resp.data.id));
				// dispatch(saveThumbnailGenerated(resp.data.thumbnailGenerated));
			}
			else {
				Swal.close();
			}

		} catch (error) {

			//dispatch(documentsClear())

			console.log(error);

			Swal.close();

			const message = error?.response?.data?.message ? error.response.data.message : GENERAL_ERROR;

			Swal.fire({
				title: 'Error', text: message, icon: 'error', heightAuto: false
			});
		}
	}
};

export const saveFileIdLoaded = (fileObject) => {
	return {
		type: types.docsSaveFileIdLoaded,
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

			const loop = (count) => {
				if (count < 10) {
					setTimeout(async () => {
						await getThumbnail(authUser, fileId).then((resp) => {
							dispatch(documentSaveThumbnail(`data:;base64,${fileBase64(resp.data)}`, fileId));
							count = 11
						}).catch(() => {
							count++
						})
						loop(count);
					}, (count * 1000));
				}
			}

			loop(0);

		} catch (error) {
			console.log(error);
			//dispatch(documentsClear())
		}

	}
};

const documentSaveThumbnail = (thumbnail, fileId) => {
	return {
		type: types.docsSaveThumbnail,
		payload: { thumbnail, fileId }
	}
};

export const documentsClear = () => {
	return {
		type: types.docsClear,
	}
};

export const startDocumentByIdLoading = (fileId, flowId, callBack) => {
	return async (dispatch, getState) => {
		const { authUser } = getState().auth;

		try {

			const resp = flowId ? await getDocumentByFlowId(authUser, flowId) : await getDocumentById(authUser, fileId);
			Swal.close();

			dispatch(documentByIdLoaded(getDataWithDate(resp.data)));
			callBack()
		} catch (error) {
			Swal.close();
			console.log(error);
			//dispatch(documentsClear())
		}

	}
};

const getDataWithDate = data => {
	const aspectList = get(data, 'aspectGroup.aspectList', null)
	if (aspectList) {
		for (const aspect of aspectList) {
			aspect.customPropertyList = aspect.customPropertyList.filter(property => {
				if (property?.type === "DATE" && property?.value) {
					property.value = moment(property.value).format('YYYY-MM-DD')
				}
				return property
			})
		}
	}
	return data
}

const documentByIdLoaded = ({ path, aspectGroup, fileId, folderId, name, tags = [], signatures = [] }) => {
	return {
		type: types.docsDocumentByIdLoaded,
		payload: {
			aspectGroup, fileId, folderId, tags, path, name, signatures
		}
	}
};
export const startDocumentFlowIdVisibility = (instanceId) => {
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

			const resp = await getDocumentFlowId(authUser, instanceId);

			Swal.close();

			dispatch(documentFlowVisibility(resp.data));

		} catch (error) {
			Swal.close();
			console.log(error);
			//dispatch(documentsClear())
		}

	}
};

const documentFlowVisibility = (docsFlow) => {
	return {
		type: types.docsDocumentFlowIdVisibility,
		payload: docsFlow,
	}
}

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
			//dispatch(documentsClear())
		}

	}
};

const documentVisibility = (docs) => {
	return {
		type: types.docsDocumentByIdVisibility,
		payload: docs,
	}
}

export const clearDocumentVisibility = () => {
	return {
		type: types.clearDocsDocumentByIdVisibility,
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

export const saveclearFolderIdOrigin = (folderId) => {
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
			path = path + folder.name + '/'
		})
		path = path + folderName
		dispatch(savepathFolderName(path))
	}
}

export const savepathFolderName = (path) => {
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
	tags,
	callback
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

			const response = await editForm(authUser, folderId, [fileId], aspectGroup, tags);
			Swal.close();

			const resp = await Swal.fire({
				icon: 'success',
				title: 'Documento modificado con éxito',
				html: `<ul>${response.data.map(({ name, id }) => `<li><h6><b>${id}</b>    ${name}</h6></li>`)}</ul>
				<br/><center>¿Desea regresar a la vista anterior?</center>`,
				showConfirmButton: true,
				showCloseButton: true,
				showCancelButton: true,
				confirmButtonText: 'Sí, regresar',
				cancelButtonText: 'No',
			})

			if (resp.value) {
				callback && callback()
			}

		} catch (error) {
			console.log(error);
		}

	}
};

export const startEditFlowDocumentLoading = (
	folderId,
	files,
	fileId,
	versioningType,
	versioningComments,
	aspectGroup,
	tags,
	callback
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

			const response = await editFLowForm(authUser, folderId, [fileId], aspectGroup, tags);
			Swal.close();

		} catch (error) {
			console.log(error);
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

export const startDocumentsOfficeLoading = (authUser, fileId, onClose) => {
	return async (dispatch) => {

		try {
			

			const resp = await getOffice(authUser, fileId);
			window.location.replace(resp.data)
			
			
			//dispatch(documentsOfficeLoaded(resp.data));

		} catch (error) {
			console.log(error);
			Swal.close();

			const message = error?.response?.data?.message ? error.response.data.message : GENERAL_ERROR;

			Swal.fire({
				title: 'Error', text: message, icon: 'error', heightAuto: false
			});
		} finally{
			onClose()
		}
	

	}
};



