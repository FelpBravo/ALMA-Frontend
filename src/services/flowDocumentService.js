import { axiosInstance } from '../config/axios-instance';

const getApproves = (authUser, flowName) => {
    return axiosInstance.get(`/flows/name/${flowName}/approves`, {
        headers: {
            Authorization: `Bearer ${authUser}`,
        },
    });
};

const postFlows = (authUser, data) => {
    return axiosInstance.post(`/flows/data`, data, {
        headers: {
            Authorization: `Bearer ${authUser}`,
        },
    });
};

export { getApproves,
         postFlows, }