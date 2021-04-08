import Swal from 'sweetalert2';
import { types } from 'types/types';
import { GENERAL_ERROR } from 'constants/constUtil';
import { getUsers } from 'services/usersService';

export const startUsersInitLoading = (authUser) => {
	return async (dispatch) => {

		try {

			const resp = await getUsers(authUser);

			dispatch(usersInitLoaded(resp.data));

		} catch (error) {
			console.log(error);
		}

	}
};

export const usersInitLoaded = (userslist) => {
	return {
		type: types.usersInitLoaded,
		payload: userslist,
	}
};

export const openModalUsers = () => {
	return {
		type: types.usersOpenModal,
	}
};

export const closeModalUsers = () => {
	return {
		type: types.usersCloseModal,
	}
};

export const openModalEditUsers = () => {
	return {
		type: types.usersEditOpenModal,
	}
};

export const closeModalEditUsers = () => {
	return {
		type: types.usersEditCloseModal,
	}
};
