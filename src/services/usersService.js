import { axiosInstance } from '../config/axios-instance';

const token = localStorage.getItem('token');

const postUsers = (authUser, page, maxItems) => {
	return axiosInstance.post('/users/getAll',{page, maxItems}, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const getUsers = (authUser) => {
	return axiosInstance.get('/users', {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const infoUsers = (authUser, id) => {
	return axiosInstance.get(`/users/id/${id}`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const validateUsers = (authUser, idUser) => {
	return axiosInstance.get(`/users/validate/${idUser}`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const departmentsUsers = (authUser) => {
	return axiosInstance.get(`/users/lists/departments`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const companyUsers = (authUser) => {
	return axiosInstance.get(`/users/lists/companies`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const searchUsersPage = (authUser, search,page, maxItems) => {
	return axiosInstance.post(`/users/search/${search}/paged`, {page, maxItems},{
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const addUsers = (authUser, id, firstName, lastName, email, password, company, department, companyOther, departmentOther, groups =[]) => {
	return axiosInstance.post(`/users`,
		{ id, firstName, lastName, email, password:"password", company, department, companyOther, departmentOther, groups},
		{
			headers: {
				Authorization: `Bearer ${authUser}`,
			},
		}
	);
};

const editUsers = (authUser, idUser, data) => {
	return axiosInstance.put(`/users/${idUser}`,data,
		{
			headers: {
				Authorization: `Bearer ${authUser}`,
			},
		}
	);
};

const statusUsers = (authUser, idUser, status) => {
	return axiosInstance.put(`/users/${idUser}/status`,{ enabled:status },
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
	searchUsersPage,
	departmentsUsers,
	companyUsers,
	postUsers,
}