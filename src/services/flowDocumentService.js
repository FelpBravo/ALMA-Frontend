import { axiosInstance } from '../config/axios-instance';

const getApproves = (authUser, flowName) => {
    return axiosInstance.get(`/flows/name/${flowName}/approves`, {
        headers: {
            Authorization: `Bearer ${authUser}`,
        },
    });
};

const postFlows = (authUser, flow, document, approves ,comment , startedBy) => {
    return axiosInstance.post(`/flows/data`, {authUser, flow, document, approves ,comment, startedBy}, {
        headers: {
            Authorization: `Bearer ${authUser}`,
        },
    });
};

const getActiveTasks = (authUser, page, pageSize, status) => {
    return axiosInstance.post(`/flows/data/activeTasks`, { page, pageSize, status },{
        headers: {
            Authorization: `Bearer ${authUser}`,
        },
    });
};

const postFlowAll= (authUser, page, pageSize) => {
    return axiosInstance.post(`/flows/data/all`, { page, pageSize },{
        headers: {
            Authorization: `Bearer ${authUser}`,
        },
    });
};

export { getApproves,
         postFlows,
         getActiveTasks,
         postFlowAll,
         }