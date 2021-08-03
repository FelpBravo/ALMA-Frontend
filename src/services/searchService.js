import { axiosInstance } from '../config/axios-instance';

const getSearchFields = (authUser) => {
	return axiosInstance.get(`/searches/filters`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const search = (authUser, term, filters = [], folderId, page, maxItems = 10, tagId) => {
	return axiosInstance.post(`/searches/`,
		{ term, page, folderId, maxItems, filters, tagId },
		{
			headers: {
				Authorization: `Bearer ${authUser}`,
			},
		}
	);
}

const getSavedSearchById = (authUser, id) => {
	return axiosInstance.get(`/searches/filters/${id}`,
		{
			headers: {
				Authorization: `Bearer ${authUser}`,
			},
		}
	);
}

const saveSearch = (authUser, name, filters = [], ) => {
	return axiosInstance.post(`/searches/filters/save`,
		{ name, filters },
		{
			headers: {
				Authorization: `Bearer ${authUser}`,
			},
		}
	);
}

const getSavedSearches = (authUser) => {
	return axiosInstance.get(`/searches/filters/saved`,
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
	saveSearch,
	getSavedSearches,
	getSavedSearchById,
}