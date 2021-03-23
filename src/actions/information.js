import {
	createAttachments,
	getAttachments,
	getTopic,
	createTopic,
	getReplies,
	createReplies
} from 'services/informationService';
import { types } from 'types/types';
import Swal from 'sweetalert2';

export const startSaveCommentsLoading = (authUser, fileId) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});
			Swal.showLoading();

			const resp = await getTopic(authUser, fileId)

			dispatch(commentsLoaded(resp.data))

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const startSaveAttachmentsLoading = (authUser, fileId) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});
			Swal.showLoading();

			const resp = await getAttachments(authUser, fileId)

			dispatch(attachmentsLoaded(resp.data))
			console.log("soy el adjunto", resp.data)

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const saveComments = (authUser, fileId, content, file) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});
			Swal.showLoading();

			await createTopic(authUser, fileId, content, file).then(async() => {
				const resp = await getTopic(authUser, fileId)
				dispatch(commentsLoaded(resp.data))
			})




		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const saveReplies = (authUser, fileId, idComment, content, file) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});
			Swal.showLoading();

			await createReplies(authUser, idComment, content, file).then(async() => {
				const resp = await getTopic(authUser, fileId)
				dispatch(commentsLoaded(resp.data))
			})



		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}
	}
};

export const getCommentsReply = async (authUser, idComment) => {
	try {
		Swal.fire({
			title: 'Cargando...',
			text: 'Por favor espere...',
			allowOutsideClick: false,
			heightAuto: false,
		});
		Swal.showLoading();
		const resp = await getReplies(authUser, idComment)
		return resp.data


	} catch (error) {
		console.log(error);
	} finally {
		Swal.close();
	}

};


export const attachmentsLoaded = (attachment) => {
	return {
		type: types.attachmentsDataLoaded,
		payload: attachment,
	}
};

export const commentsLoaded = (comments) => {
	return {
		type: types.commentsDataLoaded,
		payload: comments,
	}
};

export const informationRemoveAll = () => {
	return {
		type: types.informationRemoveAll,
	}
};

export const startUploadAttachments = (authUser, fileId, files) => {
		return async (dispatch) => {
			try {
				Swal.fire({
					title: 'Cargando...',
					text: 'Por favor espere...',
					allowOutsideClick: false,
					heightAuto: false,
				});
				Swal.showLoading();
	
				await createAttachments(authUser, files, fileId).then(async() => {
					const resp = await getAttachments(authUser, fileId)
					dispatch(attachmentsLoaded(resp.data))
				})
	
	
	
	
			} catch (error) {
				console.log(error);
			} finally {
				Swal.close();
			}
	
		}
	};
