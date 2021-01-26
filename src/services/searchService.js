import { axiosInstance } from '../config/axios-instance';

const getSearchFields = (authUser) => {
	return axiosInstance.get(`/search/filters`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const search = (authUser, term, filters = [], folderId, page = 1, maxItems = 10) => {
	return axiosInstance.post(`/search/`,
		{ term, page, folderId, maxItems, filters, },
		{
			headers: {
				Authorization: `Bearer ${authUser}`,
			},
		}
	);
}

export {
	getSearchFields,
	search,
}