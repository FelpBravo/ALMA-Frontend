import Swal from 'sweetalert2';
import { types } from 'types/types';
import { GENERAL_ERROR } from 'constants/constUtil';


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

