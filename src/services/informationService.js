import { axiosInstance } from '../config/axios-instance';


const createAttachments = (authUser, file, fileId) => {

	const data = new FormData();
	data.append('files', file);

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

const createTopic = (authUser, fileId, content, file) => {
	console.log(fileId,content,file);
	const data = new FormData();
	data.append('files', file);
	data.append('content', content)

	return axiosInstance.post(`/files/${fileId}/topic`, data, {
		headers: {
			Authorization: `Bearer ${authUser}`,
			'Content-Type': 'multipart/form-data'
		},
	});
};

const createReplies = (authUser, idComment, content, file) => {
	const data = new FormData();
	data.append('files', file);
	data.append('content', content)

	return axiosInstance.post(`/files/${idComment}/reply`, data, {
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

const getReplies = (authUser,idComment) => {
    return axiosInstance.get(`/files/${idComment}/replies`,{
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
	getTopic,
	getReplies,
	createReplies
}