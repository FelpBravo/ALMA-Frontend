import { deleteDocument, subscribeDocument } from 'services/filesService';
import { getSearchFields, search } from 'services/searchService';
import { types } from 'types/types';
import Swal from 'sweetalert2';

export const startSearchFieldsLoading = () => {
	return async (dispatch) => {

		try {

			const resp = await getSearchFields();
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

export const startSearchLoading = (term, filters, folderId, page, maxItems) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await search(term, filters, folderId, page, maxItems);

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
	return async (dispatch) => {

		try {
			Swal.fire({
				title: 'Deleting...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await deleteDocument(id);

			dispatch(deletedDocumentFinish(id));

		} catch (error) {
			console.log(error);
		} finally {
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
	return async (dispatch) => {

		try {
			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await subscribeDocument(id);

			dispatch(subscribeDocumentFinish(id));

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

const subscribeDocumentFinish = (id) => {
	return {
		type: types.searchSubscribeDocumentFinish,
		payload: id
	}
};