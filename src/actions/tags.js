import { getTags, addTags, editTags, deleteTags} from 'services/tagsServices';
import { types } from 'types/types';

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
