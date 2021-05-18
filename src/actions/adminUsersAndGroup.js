import Swal from 'sweetalert2';
import { types } from 'types/types';
import {
	getUsers,
	editUsers,
	statusUsers,
	validateUsers,
	searchUsersPage,
	departmentsUsers,
	companyUsers,
	addUsers,
	postUsers
} from 'services/usersService';
import { 
	addGroup,
	addUsersGroup,
	dependenciesGroup, 
	getGroup, 
	membersGroup, 
	profilesGroup,
	removeUsersGroup, 
	searchGroup, 
	validateGroup,
	deleteGroup
} from 'services/groupService';

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

			const resp = await postUsers(authUser,page,10);
			dispatch(usersInitLoaded(resp.data))

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const usersInitLoading = (authUser) => {
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
			dispatch(usersAllInitLoaded(resp))

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
export const validateGroupName = (authUser, name) => {
	return async (dispatch) => {
		try {
			const resp = await validateGroup(authUser, name)
			dispatch(nameGroupValidate(resp.data.exists))
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

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const startCreateUsersLoading = (authUser, data) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();
			 const {id, firstName, lastName, email, password, company, department, companyOther, departmentOther, group} = data

			await addUsers(authUser, id, firstName, lastName, email, password, company, department, companyOther, departmentOther, group);

			const resp = await postUsers(authUser, 1, 10);
			
			dispatch(saveUsersLoaded());
			dispatch(usersInitLoaded(resp.data));
			Swal.close();

		} catch (error) {
			Swal.close();
			console.log(error);
		}

	}
}

export const dependenciesGroupInitLoading = (authUser) => {
	return async (dispatch) => {

		try {
			const resp = await dependenciesGroup(authUser);
			dispatch(dependenciesInitLoaded(resp.data))

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

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const startGroupInitLoading = (authUser) => {
	return async (dispatch) => {

		try {
			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await getGroup(authUser);
			dispatch(groupInitLoaded(resp.data))

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const groupSearchLoading = (authUser, search) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});
			Swal.showLoading();

			const resp = await searchGroup(authUser,search)
			dispatch(groupInitLoaded(resp.data))
	
		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}
	}
};

export const startCreateGroupLoading = (authUser, name, users) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await addGroup(authUser, name, users);

			const resp = await getGroup(authUser);
			
			Swal.close();

			dispatch(saveGroupLoaded());
			dispatch(groupInitLoaded(resp.data));

		} catch (error) {
			Swal.close();
			console.log(error);
		}

	}
};

export const membersGroupInitLoading = (authUser, idGroup, nameGroup) => {
	return async (dispatch) => {

		try {
			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});
			Swal.showLoading();
			const resp = await membersGroup(authUser, idGroup);
			dispatch(membersInitLoaded(resp.data, idGroup, nameGroup))
		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const createUsersGroupLoading = (authUser, idGroup, nameGroup) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await addUsersGroup(authUser, idGroup, nameGroup);

			const resp = await membersGroup(authUser, idGroup);
			console.log(idGroup)
			
			Swal.close();

			dispatch(saveUsersGroupLoaded());
			dispatch(membersInitLoaded(resp.data));

		} catch (error) {
			Swal.close();
			console.log(error);
		}

	}
};

export const removeUserGroupLoading = (authUser, idGroup, userId) => {
	return async (dispatch, getState) => {

		const { members = [] } = getState().adminUsers;

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await removeUsersGroup(authUser, idGroup, userId);
			Swal.close();

			const newCurrentMembers = members.filter(user => user.id !== userId);

			dispatch(deleteUsersGroupLoaded(newCurrentMembers));	

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const deleteGroupLoading = (authUser, idGroup) => {
	return async (dispatch, getState) => {

		const { grouplist = [] } = getState().adminUsers;

		try {

			Swal.fire({
				title: 'Cargando...',
				text: 'Por favor espere...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await deleteGroup(authUser, idGroup);
			Swal.close();

			const newCurrentGroup = grouplist.filter(group => group.id !== idGroup);

			dispatch(deleteGroupLoaded(newCurrentGroup));	

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const deleteGroupLoaded = (groupData) => {
	return {
		type: types.groupDeleteLoaded,
		payload: groupData
		
	}
}

export const deleteUsersGroupLoaded = (usersData) => {
	return {
		type: types.usersDeleteLoaded,
		payload: usersData
		
	}
}

export const saveGroupLoaded = () => {
	return {
		type: types.groupSaveLoaded,
	}
}
export const saveUsersGroupLoaded = () => {
	return {
		type: types.usersGroupSaveLoaded,
	}
}

export const saveUsersLoaded = () => {
	return {
		type: types.usersSaveLoaded,
	}
}
export const usersInitLoaded = (userslist) => {
	return {
		type: types.usersInitLoaded,
		payload: userslist,
	}
};

export const usersAllInitLoaded = (usersAll) => {
	return {
		type: types.usersAllInitLoaded,
		payload: usersAll,
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
		payload: validate,
	}
}
export const nameGroupValidate = (groupname) => {
	return {
		type: types.groupValidateName,
		payload: groupname,
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

export const openModalUsersGroup = () => {
	return {
		type: types.usersGroupOpenModal,
	}
};

export const closeModalUsersGroup = () => {
	return {
		type: types.usersGroupCloseModal,
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

export const groupInitLoaded = (grouplist) => {
	return {
		type: types.groupInitLoaded,
		payload: grouplist,
	}
};

export const membersInitLoaded = (members, idGroup, nameGroup) => {
	return {
		type: types.membersInitLoaded,
		payload: {
			members: members,
			idGroup: idGroup,
			nameGroup: nameGroup,
		}
	}
};


