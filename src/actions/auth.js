import Swal from 'sweetalert2';

import { login } from '../services/authService';
import { uiFinishLoading } from './uiAuth';
import { types } from '../types/types';
import { folderRemoveAll } from './folders';
import { searchRemoveText } from './search';
import { documentsRemoveAll } from './documents';
import { adminFoldersremoveAll } from './adminFolders';
import { tagsRemoveAll } from './tags';
import { auditRemoveAll } from './audit';
import jwt_decode from 'jwt-decode'
export const startUserSignInLogin = (userName, password) => {
	return async (dispatch) => {
		try {
			const resp = await login(userName, password,'password');
			localStorage.setItem('token', resp.data.access_token);
			dispatch(uiFinishLoading());
			dispatch(userSignInSuccess(resp.data.access_token));
		} catch (error) {
			console.log(error);
			dispatch(uiFinishLoading());
			Swal.fire({
				title: 'Error', text: 'Usuario y/o contraseña incorrecto', icon: 'error', heightAuto: false
			});
		}
	}
};

export const userSignInSuccess = (authUser) => {
	const { authorities, user } = jwt_decode(authUser)
	return {
		type: types.login,
		payload: {
			authUser : authUser,
			authorities: authorities,
			userId:user.userId
		}
		
	}
};

export const startUserSingOut = () => {
	return (dispatch) => {
		localStorage.removeItem('token');
		dispatch(folderRemoveAll());
		dispatch(searchRemoveText());
		dispatch(userSignOut());
		dispatch(documentsRemoveAll());
		dispatch(adminFoldersremoveAll());
		dispatch(tagsRemoveAll());
		dispatch(auditRemoveAll())
	}
}

export const userSignOut = () => {
	return {
		type: types.logout,
	};
};
