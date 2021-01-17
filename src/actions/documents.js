import { getAll, getById } from 'services/aspectGroupsService';
import Swal from 'sweetalert2';
import { types } from 'types/types';

export const startDocumentsTypeLoading = () => {
	return async (dispatch) => {

		try {

			const resp = await getAll();

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
}