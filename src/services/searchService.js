import { axiosInstance } from '../config/axios-instance';

const token = localStorage.getItem('token');

const getSearchFields = () => {
	return axiosInstance.get(`/search/filters`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const search = (term, filters = [], folderId, page = 1, maxItems = 10) => {
	return axiosInstance.post(`/search/`,
		{ term, page, folderId, maxItems, filters, },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
}

export {
	getSearchFields,
	search,
}