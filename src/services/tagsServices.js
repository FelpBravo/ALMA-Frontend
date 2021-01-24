import { axiosInstance } from '../config/axios-instance';

const token = localStorage.getItem('token');

const getTags = () => {
	return axiosInstance.get('/tags/', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

{/*const addTags = () => {
	return axiosInstance.put(`/tags/add`,
		{ tag, hex },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};

const editTags = () => {
	return axiosInstance.options(`/tags/edit`,
		{ id, tag, hex },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};
*/}
const deleteTags = (tagId) => {
	return axiosInstance.delete(`/tags/${tagId}/delete`,{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};




export {
	getTags,
	deleteTags,
}