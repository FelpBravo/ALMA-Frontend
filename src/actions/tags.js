import { getTags, addTags, editTags, deleteTags, getTagsById} from 'services/tagsServices';
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

export const tagsInitLoaded = (tagS) => {
	return {
		type: types.tagsInitLoaded,
		payload: tagS,
	}
};

export const startTagsSetChildren = (authUser, tagId) => {
	return async (dispatch) => {

		try {

			const resp = await getTagsById(authUser, tagId);

			dispatch(tagsSetChildren(tagId, resp.data));

		} catch (error) {
			console.log(error);
		}

	}
};

export const tagsSetChildren = (tagId, tagS) => {
	return {
		type: types.tagsSetChildren,
		payload: {
			id: tagId,
			tagS,
		},
	}
};

export const saveTagsId = (tagId) => {
	return {
		type: types.tagsSaveIds,
		payload: tagId,
	}
};

export const removeTagsId = (tagId) => {
	return {
		type: types.tagsRemoveId,
		payload: tagId,
	}
};

export const tagsSelected = (tagId) => {
	return {
		type: types.tagsSelected,
		payload: tagId,
	}
}

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

		const { tagslist = [] } = getState().tags;

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await deleteTags(tagId);

			Swal.close();

			const newCurrentTags = tagslist.filter(tags => tags.id !== tagId);

			dispatch(deleteTagsLoaded(newCurrentTags));

		} catch (error) {
			console.log(error)
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
				title: 'Cargando...',
				text: 'Por favor espere...',
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

export const saveTagsLoaded = () => {
	return {
		type: types.tagsSaveLoaded,
	}
}

export const startEditTagsLoading = (id, tag, hex) => {
	return async (dispatch, getState) => {

		const { authUser } = getState().auth;

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await editTags(authUser, id, tag, hex).catch((error)=>{
				console.log(error);
			});

			dispatch(updateTagsLoaded(id, tag, hex));
			dispatch(saveTagsLoaded());

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

const updateTagsLoaded = (id, tag, hex) => {
	return {
		type: types.tagsUpdateLoaded,
		payload:{
			id,
			tag,
			hex,
		}
	}
};

export const tagsRemoveAll = () => {
	return {
		type: types.tagsRemoveAll,
	}
};

