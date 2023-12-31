import FileSaver from 'file-saver';
import Swal from 'sweetalert2';

import { GENERAL_ERROR, SUCCESS_MESSAGE } from 'constants/constUtil';
import { deleteDocument, downloadDocument, subscribeDocument } from 'services/filesService';
import { getSavedSearchById, getSavedSearches, getSearchFields, saveSearch, search } from 'services/searchService';
import { getVersioning } from 'services/versioningService'
import { types } from 'types/types';

export const startVersioningLoading = (authUser, page, fileId) => {
	return async (dispatch) => {

		try {
			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();


			const resp = await getVersioning(authUser, page, 10, fileId);
			dispatch(versioningLoaded(resp.data, fileId));

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const startSearchFieldsLoading = (authUser) => {
	return async (dispatch) => {
		dispatch(searchRemoveAll())
		try {
			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await getSearchFields(authUser);
			dispatch(searchFieldsLoaded(resp.data));

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const startSearchLoading = (authUser, term, filters, folderId, page, maxItems, tagId) => {

	return async (dispatch) => {
		dispatch(versioningRemove())
		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();
			const resp = await search(authUser, term, filters, folderId, page ? parseInt(page) : 1, maxItems, tagId);

			dispatch(searchLoaded(resp.data));

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const savedSearches = (authUser) => {

	return async (dispatch) => {
		try {
			const resp = await getSavedSearches(authUser);
			dispatch(savedSearchesList(resp.data));

		} catch (error) {
			console.log(error);
		}

	}
};

export const startSavedSearchById = (authUser, id) => {

	return async (dispatch) => {
		try {

			Swal.fire({
				title: 'Cargando datos guardados...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();
			const resp = await getSavedSearchById(authUser, id);
			dispatch(searchFieldsLoaded(resp.data));

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const startSaveSearchLoading = (authUser, filters) => {

	return async (dispatch) => {
		try {

			Swal.fire({
				title: 'Guarda tu búsqueda',
				icon: 'question',
				html: `<center><h5>Ingresa un nombre para los criterios de tu búsqueda.</h5></center>`,
				input: 'text',
				inputPlaceholder: "Nombre de la búsqueda",
				inputAttributes: {
					autocapitalize: 'off'
				},
				showCancelButton: true,
				cancelButtonText: 'Cancelar',
				confirmButtonText: 'Guardar',
				showLoaderOnConfirm: true,
				preConfirm: (name) => {
					if(name.length > 3 && name.trim()){
						return saveSearch(authUser, name, filters).then(response => response)
						.catch(error => {
							Swal.showValidationMessage(
								`Solicitud fallida: ${error}`
							)
						})
					}
					else{
						Swal.showValidationMessage(
							'Debe ingresar más de 3 carácteres'
						)
					}
			
				},
				allowOutsideClick: () => !Swal.isLoading()
			}).then(result => result?.value && dispatch(savedSearchAdd(result?.value?.data)))
		} catch (error) {
			console.log(error);
		}

	}
};

export const startDeleteDocument = (id) => {
	return async (dispatch, getState) => {

		const { authUser } = getState().auth;

		const { documents } = getState().searchs;

		try {
			Swal.fire({
				title: 'Eliminando...',
				text: 'Por favor espere',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await deleteDocument(authUser, id);

			Swal.close();

			const newlistdocuments = {
				totalItems: documents.totalItems - 1,
				data: documents.data.filter(doc => doc.id !== id),
			}
			dispatch(deletedDocumentFinish(newlistdocuments));

		} catch (error) {
			console.log(error);
			Swal.close();
		}

	}
};

export const startDownloadDocument = (id, name, version) => {
	return async (dispatch, getState) => {

		const { authUser } = getState().auth;

		const { documents } = getState().searchs;

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const { data } = await downloadDocument(authUser, id, version);

			Swal.close();

			FileSaver.saveAs(data, name);

		} catch (error) {

			Swal.close();

			const message = error?.response?.data?.message ? error.response.data.message : GENERAL_ERROR;

			Swal.fire({
				title: 'Error', text: message, icon: 'error', heightAuto: false
			});

		}
	}
};

export const startPreviewDocument = (authUser, id) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();
			await downloadDocument(authUser, id).then(({ data }) => {
				dispatch(previewDocument(data, data.type))
			});

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}
	}
};

export const startSubscribeDocument = (id) => {
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

			await subscribeDocument(authUser, id);

			Swal.close();

			await Swal.fire({
				title: 'Información', text: SUCCESS_MESSAGE, icon: 'info', heightAuto: false
			});

			dispatch(subscribeDocumentFinish(id));

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

export const previewDocument = (file, type) => {
	return {
		type: types.previewLoaded,
		payload: {
			file,
			type
		}
	}
};

export const versioningLoaded = (versioning, id) => {
	return {
		type: types.versioningLoaded,
		payload: {
			versioning,
			id
		}
	}
};

export const versioningRemove = () => {
	return {
		type: types.versioningRemove,
	}
};

export const searchLoaded = (documents) => {
	return {
		type: types.searchLoaded,
		payload: documents,
	}
};

export const savedSearchesList = (searches) => {
	return {
		type: types.savedSearchesList,
		payload: searches,
	}
};

export const savedSearchAdd = search => {
	return {
		type: types.savedSearchesAddSearch,
		payload: search,
	}
};

export const searchFieldsLoaded = (fields) => {
	return {
		type: types.searchFieldsLoaded,
		payload: fields,
	}
};

const deletedDocumentFinish = (id) => {
	return {
		type: types.searchDocumentDeleted,
		payload: id
	}
};

export const searchSetText = (text) => {
	return {
		type: types.searchSetText,
		payload: text
	}
};

export const searchRemoveText = () => {
	return {
		type: types.searchRemoveText,
	}
};

export const searchRemoveAll = () => {
	return {
		type: types.searchRemoveAll,
	}
};

export const changeCleanFilter = () => {
	return {
		type: types.changeCleanFilter
	}
};

export const searchSetValueFilter = (name, value) => {
	return {
		type: types.searchSetValueFilter,
		payload: {
			name,
			value,
		}
	}
};

export const searchClearAllFilters = () => {
	return {
		type: types.searchClearAllFilters,
	}
};

const subscribeDocumentFinish = (id) => {
	return {
		type: types.searchSubscribeDocumentFinish,
		payload: id
	}
};
export const openModalVisibility = () => {
	return {
		type: types.visibilityOpenModal,
	}
};

export const closeModalVisibility = () => {
	return {
		type: types.visibilityCloseModal,
	}
};

export const openModalFirm = () => {
	return {
		type: types.firmOpenModal,
	}
};

export const closeModalFirm = () => {
	return {
		type: types.firmCloseModal,
	}
};

export const openModalVersioning = () => {
	return {
		type: types.versioningOpenModal,
	}
};

export const closeModalVersioning = () => {
	return {
		type: types.versioningCloseModal,
	}
};