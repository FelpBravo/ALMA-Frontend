import Swal from 'sweetalert2';
import { types } from 'types/types';
import {
	getUsers,
	editUsers,
	statusUsers,
	validateUsers,
	searchUsersPage
} from 'services/usersService';
import { PagesOutlined } from '@material-ui/icons';

export const startUsersInitLoading = (authUser,page) => {
	return async (dispatch) => {

		try {
			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await getUsers(authUser,1,10);
			dispatch(usersInitLoaded(resp.data))

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};
export const editUserData = (authUser, idUser, data,page,search) => {
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
				search? dispatch(userSearchLoading(authUser,search,page)) : dispatch(startUsersInitLoading(authUser,page))
			}).catch(() => {
				search? dispatch(userSearchLoading(authUser,search,page)) : dispatch(startUsersInitLoading(authUser,page))
			})
		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}
	}
};

export const editUserStatus = (authUser, idUser, status,page,search) => {
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
				search? dispatch(userSearchLoading(authUser,search,page)) : dispatch(startUsersInitLoading(authUser,page))
			}).catch(() => {
				search? dispatch(userSearchLoading(authUser,search,page)) : dispatch(startUsersInitLoading(authUser,page))
			})

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}
	}
};

export const userSearchLoading = (authUser, search,page) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});
			Swal.showLoading();

			const resp = await searchUsersPage(authUser,search,page,10)
			dispatch(usersInitLoaded(resp.data))


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
export const openModalGroup = () => {
	return {
		type: types.groupOpenModal,
	}
};

export const closeModalGroup = () => {
	return {
		type: types.groupCloseModal,
	}
};


