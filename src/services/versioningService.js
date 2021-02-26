import { axiosInstance } from '../config/axios-instance';

const getVersioning = (authUser,page, maxItems, fileId) => {
    return axiosInstance.post(`/files/${fileId}/versions`, {page, maxItems},{
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	}).catch((e)=>{
        console.log(e);
    })
}


export {
    getVersioning,
   
}