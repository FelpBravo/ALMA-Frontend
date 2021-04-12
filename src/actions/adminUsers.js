import Swal from 'sweetalert2';
import { types } from 'types/types';
import {
	getUsers,
	editUsers,
	statusUsers,
	validateUsers
} from 'services/usersService';

export const startUsersInitLoading = (authUser) => {
	return async (dispatch) => {

		try {
			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await getUsers(authUser);

			dispatch(usersInitLoaded(resp.data));

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};
export const editUserData = (authUser, idUser, data) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});
			Swal.showLoading();
			await editUsers(authUser, idUser, data).then(() => {
				dispatch(startUsersInitLoading(authUser))
			}).catch(() => {
				dispatch(startUsersInitLoading(authUser))
			})
		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}
	}
};

export const editUserStatus = (authUser, idUser, status) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});
			Swal.showLoading();

			await statusUsers(authUser, idUser, status).then(() => {
				dispatch(startUsersInitLoading(authUser))
			}).catch(() => {
				dispatch(startUsersInitLoading(authUser))
			})

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}
	}
};

export const validateUserNickname = (authUser, idUser) => {
	return async (dispatch) => {
		try {
			const resp = await validateUsers(authUser, idUser)
			dispatch(nicknameValidate(resp.data.exists))
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

export const nicknameValidate = (validate) => {
	return {
		type: types.usersValidateNickname,
		payload: validate
	}
}

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


