import { axiosInstanceReports } from '../config/axios-instance';

const getReports = (authUser, startDate, endDate, page, maxItems = 5) => {
    console.log({page:page, maxItems:maxItems, startDate:startDate, endDate:endDate});
    return axiosInstanceReports.post('/statistics', { page:page, maxItems:maxItems, startDate:startDate, endDate:endDate },{
        headers: { 'Content-Type': 'application/json' }
    }).catch((e)=>{
        console.log(e);
    })


}

export {
    getReports
}