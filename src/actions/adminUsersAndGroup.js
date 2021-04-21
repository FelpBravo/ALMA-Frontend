import Swal from 'sweetalert2';
import { types } from 'types/types';
import {
	getUsers,
	editUsers,
	statusUsers,
	validateUsers,
	searchUsersPage,
	departmentsUsers,
	companyUsers
} from 'services/usersService';
import { dependenciesGroup, profilesGroup } from 'services/groupService';

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
export const companyUsersInitLoading = (authUser) => {
	return async (dispatch) => {

		try {
			const resp = await companyUsers(authUser);
			dispatch(companyInitLoaded(resp.data))
			console.log("la dataaaa", resp.data)

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};
export const departmentsUsersInitLoading = (authUser) => {
	return async (dispatch) => {

		try {
			const resp = await departmentsUsers(authUser);
			dispatch(departmentsInitLoaded(resp.data))
			console.log("la dataaaa", resp.data)

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const dependenciesGroupInitLoading = (authUser) => {
	return async (dispatch) => {

		try {
			const resp = await dependenciesGroup(authUser);
			dispatch(dependenciesInitLoaded(resp.data))
			console.log("la dataaaa", resp.data)

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const profilesGroupInitLoading = (authUser) => {
	return async (dispatch) => {

		try {
			const resp = await profilesGroup(authUser);
			dispatch(profilesInitLoaded(resp.data))
			console.log("la dataaaa", resp.data)

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const usersInitLoaded = (userslist) => {
	return {
		type: types.usersInitLoaded,
		payload: userslist,
	}
};

export const companyInitLoaded = (company) => {
	return {
		type: types.companyInitLoaded,
		payload: company,
	}
};

export const departmentsInitLoaded = (departments) => {
	return {
		type: types.departmentsInitLoaded,
		payload: departments,
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

export const dependenciesInitLoaded = (dependencies) => {
	return {
		type: types.dependenciesInitLoaded,
		payload: dependencies,
	}
};

export const profilesInitLoaded = (profiles) => {
	return {
		type: types.profilesInitLoaded,
		payload: profiles,
	}
};


