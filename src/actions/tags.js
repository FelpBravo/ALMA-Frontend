import { getTags, addTags, editTags, deleteTags} from 'services/tagsService';
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

export const tagsInitLoaded = (data) => {
	return {
		type: types.tagsInitLoaded,
		payload: data,
	}
};

