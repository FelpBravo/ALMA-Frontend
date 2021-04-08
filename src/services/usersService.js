import { axiosInstance } from '../config/axios-instance';

const token = localStorage.getItem('token');

const getUsers = (authUser) => {
	return axiosInstance.get('/users/user', {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const infoUsers = (authUser, id) => {
	return axiosInstance.get(`/users/user/id/${id}`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const validateUsers = (authUser, id) => {
	return axiosInstance.get(`/users/user/validate/${id}`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const addUsers = (authUser, id, firstName, lastName, email, password) => {
	return axiosInstance.post(`/users/user`,
		{ id, firstName, lastName, email, password:"password" },
		{
			headers: {
				Authorization: `Bearer ${authUser}`,
			},
		}
	);
};

const editUsers = (authUser, id, firstName, lastName, email) => {
	return axiosInstance.put(`/users/user/${id}`,
		{firstName, lastName, email },
		{
			headers: {
				Authorization: `Bearer ${authUser}`,
			},
		}
	);
};

const statusUsers = (authUser, id, status) => {
	return axiosInstance.put(`/users/user/${id}/${status}`,
		{
			headers: {
				Authorization: `Bearer ${authUser}`,
			},
		}
	);
};






export {
	getUsers,
	addUsers,
	editUsers,
    infoUsers,
    validateUsers,
    statusUsers,
}