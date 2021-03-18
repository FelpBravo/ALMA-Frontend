import { axiosInstance } from '../config/axios-instance';


const createAttachments = (authUser, file, fileId) => {

	const data = new FormData();
	data.append('file', file);

	return axiosInstance.post(`/files/${fileId}/attachment`, data, {
		headers: {
			Authorization: `Bearer ${authUser}`,
			'Content-Type': 'multipart/form-data'
		},
	});

};

const getAttachments = (authUser,fileId) => {
    return axiosInstance.get(`/files/${fileId}/attachments`,{
        headers: {
			Authorization: `Bearer ${authUser}`,
		},
    }).catch((e)=>{
        console.log(e);
    })
}

const createTopic = (authUser, file, fileId) => {

	const data = new FormData();
	data.append('file', file);

	return axiosInstance.post(`/files/${fileId}/topic`, data, {
		headers: {
			Authorization: `Bearer ${authUser}`,
			'Content-Type': 'multipart/form-data'
		},
	});

};

const getTopic = (authUser,fileId) => {
    return axiosInstance.get(`/files/${fileId}/topic`,{
        headers: {
			Authorization: `Bearer ${authUser}`,
		},
    }).catch((e)=>{
        console.log(e);
    })
}


export {
    createAttachments,
    getAttachments,
	createTopic,
	getTopic
}