import { axiosInstance } from '../config/axios-instance';

const getGroup = (authUser) => {
	return axiosInstance.get('/groups', {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const searchGroup = (authUser, term) => {
	return axiosInstance.get(`/groups/search/${term}`,{
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};


const validateGroup = (authUser, name) => {
	return axiosInstance.get(`/groups/validate/${name}`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const dependenciesGroup = (authUser) => {
	return axiosInstance.get(`/groups/dependencies`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const profilesGroup = (authUser) => {
	return axiosInstance.get(`/groups/profiles`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const addGroup = (authUser, name, users =[]) => {
	return axiosInstance.post(`/groups`,
		{ name, users},
		{
			headers: {
				Authorization: `Bearer ${authUser}`,
			},
		}
	);
};

const membersGroup = (authUser, id) => {
	return axiosInstance.get(`/groups/members/${id}`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const addUsersGroup = (authUser, id, users = []) => {
	return axiosInstance.put(`/groups/members/${id}/add`,
	{users},
		{
			headers: {
				Authorization: `Bearer ${authUser}`,
			},
		}
	);
};

const removeUsersGroup = (authUser, id, userId) => {
	return axiosInstance.put(`/groups/members/${id}/remove/${userId}`, null,
		{
			headers: {
				Authorization: `Bearer ${authUser}`,
			},
		}
	);
};

const deleteGroup = (authUser, idGroup) => {
	return axiosInstance.delete(`/groups/${idGroup}`,
		{
			headers: {
				Authorization: `Bearer ${authUser}`,
			},
		}
	);
};


export {
	getGroup,
    searchGroup,
    validateGroup,
    dependenciesGroup,
    profilesGroup,
	addGroup,
	membersGroup,
	addUsersGroup,
	removeUsersGroup,
	deleteGroup,
}