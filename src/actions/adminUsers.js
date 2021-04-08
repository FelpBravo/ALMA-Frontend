import Swal from 'sweetalert2';
import { types } from 'types/types';
import { getUsers, statusUsers } from 'services/usersService';

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
		}finally {
			Swal.close();
		}

	}
};
export const editStatusUser = (authUser,idUser,status) => {
	return async (dispatch) => {

		try {
			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();
				let newStatus;

					if(status)
					{
						newStatus = 1
					}else{
						newStatus = 0
					}

			await statusUsers(authUser,idUser,newStatus).then(()=>{
				startUsersInitLoading(authUser)
			})

		} catch (error) {
			console.log(error);
		}finally {
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
