import { createFirm, getFirm } from 'services/firmService';
import { startDocumentByIdLoading, startDocumentByIdVisibility} from 'actions/documents'
import { types } from 'types/types';
import Swal from 'sweetalert2';
 
export const startSaveFirmLoading = (authUser,password,fileid) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();
			const resp = await createFirm(authUser,password,fileid)

			dispatch(startDocumentByIdVisibility(fileid));

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const startFirmLoading = (authUser,fileid) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();
			const resp = await getFirm(authUser,fileid)

			dispatch(firmLoaded(resp.data));

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const clearFirm = () => {
	return async (dispatch) => {
		dispatch(firmRemoveAll());
	}
};


//////

export const firmLoaded = (firm) => {
	return {
		type: types.firmDataLoaded,
		payload:firm.signatures,
	}
};

export const firmRemoveAll = () => {
	return {
		type: types.firmRemoveAll,
	}
};

