import { axiosInstance } from '../config/axios-instance';

const getSearchFields = (authUser) => {
	return axiosInstance.get(`/searches/filters`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const search = (authUser, term, filters = [], folderId, page, maxItems = 10) => {
	return axiosInstance.post(`/searches/`,
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