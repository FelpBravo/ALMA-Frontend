import { createAttachments, getAttachments, getTopic} from 'services/informationService';
import { types } from 'types/types';
import Swal from 'sweetalert2';
 
export const startSaveCommentsLoading = (authUser,fileid) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});
			Swal.showLoading();

			const resp = await getTopic(authUser,fileid)

			dispatch(commentsLoaded(resp.data))

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const startSaveAttachmentsLoading = (authUser,fileid) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});
			Swal.showLoading();

			const resp = await getAttachments(authUser,fileid)

			dispatch(attachmentsLoaded(resp.data))
            
		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};


export const attachmentsLoaded = (attachment) => {
	return {
		type: types.attachmentsDataLoaded,
		payload:attachment,
	}
};

export const commentsLoaded = (comments) => {
	return {
		type: types.commentsDataLoaded,
		payload:comments,
	}
};

export const informationRemoveAll = () => {
	return {
		type: types.informationRemoveAll,
	}
};

