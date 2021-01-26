import { axiosInstance } from '../config/axios-instance';

//const token = localStorage.getItem('token');

const getTags = () => {
	const token = localStorage.getItem('token');
	return axiosInstance.get('/tags/', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const addTags = (tag, hex) => {
	const token = localStorage.getItem('token');
	return axiosInstance.post(`/tags/add`,
		{ tag, hex },{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};

const editTags = (id, tag, hex) => {
	const token = localStorage.getItem('token');
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
	const token = localStorage.getItem('token');
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