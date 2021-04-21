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


export {
	getGroup,
    searchGroup,
    validateGroup,
    dependenciesGroup,
    profilesGroup,
}