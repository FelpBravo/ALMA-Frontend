import { axiosInstance } from '../config/axios-instance';

const createFirm = (authUser, password,fileId) => {
    return axiosInstance.post('/signatures', { password, fileId },{
        headers: {
			Authorization: `Bearer ${authUser}`,
		},
    }).catch((e)=>{
        console.log(e);
    })
}

const getFirm = (authUser,fileId) => {
    return axiosInstance.get(`/files/${fileId}`,{
        headers: {
			Authorization: `Bearer ${authUser}`,
		},
    }).catch((e)=>{
        console.log(e);
    })
}


export {
    createFirm,
    getFirm
}