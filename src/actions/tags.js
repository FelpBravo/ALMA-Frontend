import { getTags, addTags, editTags, deleteTags} from 'services/tagsServices';
import Swal from 'sweetalert2';
import { types } from 'types/types';
import { GENERAL_ERROR } from 'constants/constUtil';

export const startTagsInitLoading = (authUser) => {
	return async (dispatch) => {

		try {

			const resp = await getTags(authUser);

			dispatch(tagsInitLoaded(resp.data));

		} catch (error) {
			console.log(error);
		}

	}
};

export const tagsInitLoaded = (taglist) => {
	return {
		type: types.tagsInitLoaded,
		payload: taglist,
	}
};

export const openModalTags = () => {
	return {
		type: types.tagsOpenModal,
	}
};

export const closeModalTags = () => {
	return {
		type: types.tagsCloseModal,
	}
};

export const setActionModalTags = (type) => {
	return {
		type: types.tagsSetActionModal,
		payload: type,
	}
};

export const setTagsList = (tags) => {
	return {
		type: types.tagsSetFolder,
		payload: tags,
	}
};

export const startDeleteTagsLoading = (tagId) => {
	return async (dispatch, getState) => {

		const { taglist = [] } = getState().tags;

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await deleteTags(tagId);

			Swal.close();

			const newCurrentTags = taglist.filter(tags => tags.id !== tagId);

			dispatch(deleteTagsLoaded(newCurrentTags));

		} catch (error) {
			console.log('error',error)
			Swal.close();

			const message = error?.response?.data?.message ? error.response.data.message : GENERAL_ERROR;

			Swal.fire({
				title: 'Error', text: message, icon: 'error', heightAuto: false
			});
		}

	}
};

export const deleteTagsLoaded = (tagsData) => {
	return {
		type: types.tagsDeleteLoaded,
		payload: tagsData
		
	}
}
export const startCreateTagsLoading = (authUser, tag, hex) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await addTags(authUser, tag, hex);

			const resp = await getTags(authUser);
			
			Swal.close();

			dispatch(saveTagsLoaded());
			dispatch(tagsInitLoaded(resp.data));

		} catch (error) {
			Swal.close();
			console.log(error);
		}

	}
};

const saveTagsLoaded = () => {
	return {
		type: types.tagsSaveLoaded,
	}
}

export const startEditTagsLoading = (tag, hex, id) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await editTags(tag, hex, id);

			dispatch(updateTagsLoaded(tag, hex, id));
			dispatch(saveTagsLoaded());

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

const updateTagsLoaded = (tag, hex, id) => {
	return {
		type: types.tagsUpdateLoaded,
		payload:{
			hex,
			tag,
			id,
		}
	}
};
