import { axiosInstance } from '../config/axios-instance';

const token = localStorage.getItem('token');

const getTags = (authUser) => {
	return axiosInstance.get('/tags/', {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const addTags = (authUser, tag, hex) => {
	return axiosInstance.post(`/tags/add`,
		{ tag, hex },{
			headers: {
				Authorization: `Bearer ${authUser}`,
			},
		}
	);
};

const editTags = (id, tag, hex) => {
	return axiosInstance.put(`/tags/edit`,
	{"id":id, "hex":hex, "tag":tag },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};

const deleteTags = (tagId) => {
	return axiosInstance.delete(`/tags/${tagId}/delete`,
{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};




export {
	getTags,
	deleteTags,
	addTags,
	editTags,
}