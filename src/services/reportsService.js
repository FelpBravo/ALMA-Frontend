import { axiosInstance, axiosInstanceReports } from '../config/axios-instance';

const getReports = (authUser, startDate, endDate, page, maxItems) => {
    return axiosInstanceReports.post('/statistics', { page, maxItems, startDate, endDate },{
        headers: { 'Content-Type': 'application/json' }
    }).catch((e)=>{
        console.log(e);
    })
}

const getMissing = (authUser,name , startDate, endDate, page, maxItems) => {
    return axiosInstance.post('/audits/missing-documents', { name,page, maxItems, startDate, endDate },{
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	}).catch((e)=>{
        console.log(e);
    })
}
const getWithout = (authUser,name, page, maxItems) => {
    return axiosInstance.post('/audits/empty-documents', { name,page, maxItems},{
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	}).catch((e)=>{
        console.log(e);
    })
}


export {
    getReports,
    getMissing,
    getWithout
}