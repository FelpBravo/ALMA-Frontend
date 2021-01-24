import { removeTags } from 'helpers/removeTags';
import { getTags, addTags, editTags, deleteTags} from 'services/tagsServices';
import Swal from 'sweetalert2';
import { types } from 'types/types';
import { GENERAL_ERROR } from 'constants/constUtil';

export const startTagsInitLoading = () => {
	return async (dispatch) => {

		try {

			const resp = await getTags();

			dispatch(tagsInitLoaded(resp.data));

		} catch (error) {
			console.log(error);
		}

	}
};

export const tagsInitLoaded = (tagslist) => {
	return {
		type: types.tagsInitLoaded,
		payload: tagslist,
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

export const setTagsList = (tagslist) => {
	return {
		type: types.tagSetFolder,
		payload: tagslist,
	}
};

export const startDeleteTagsLoading = (tagId) => {
	return async (dispatch, getState) => {

		const { tagsData } = getState().tags;

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

			const newCurrentTags = tagsData.filter(tags => tags.id !== tagId);

			dispatch(deleteTagsLoaded(newCurrentTags));

		} catch (error) {
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
