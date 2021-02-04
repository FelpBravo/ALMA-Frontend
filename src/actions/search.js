import { deleteDocument, subscribeDocument } from 'services/filesService';
import { getSearchFields, search } from 'services/searchService';
import { types } from 'types/types';
import Swal from 'sweetalert2';
import { GENERAL_ERROR, SUCCESS_MESSAGE } from 'constants/constUtil';

export const startSearchFieldsLoading = (authUser) => {
	return async (dispatch) => {

		try {

			const resp = await getSearchFields(authUser);
			dispatch(searchFieldsLoaded(resp.data));

		} catch (error) {
			console.log(error);
		}

	}
};

export const searchFieldsLoaded = (fields) => {
	return {
		type: types.searchFieldsLoaded,
		payload: fields,
	}
};

export const startSearchLoading = (authUser, term, filters, folderId, page, maxItems) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await search(authUser, term, filters, folderId, page, maxItems);

			dispatch(searchLoaded(resp.data));

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const searchLoaded = (documents) => {
	return {
		type: types.searchLoaded,
		payload: documents,
	}
};

export const startDeleteDocument = (id) => {
	return async (dispatch, getState) => {

		const { authUser } = getState().auth;
		
		const { documents } = getState().searchs;
		console.log(documents);
		documents.data.map((doc)=>{
			console.log(doc);
		})	
		try {
			Swal.fire({
				title: 'Deleting...',
				text: 'Please wait...',
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
			console.log(newlistdocuments);
			dispatch(deletedDocumentFinish(newlistdocuments));

		} catch (error) {
			console.log("entro errror");
			console.log(error);
			Swal.close();
		}

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

export const startSubscribeDocument = (id) => {
	return async (dispatch, getState) => {

		const { authUser } = getState().auth;

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
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