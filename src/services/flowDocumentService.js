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
    return axiosInstance.post(`/flows/data/tasks?page=${page}&pageSize=${pageSize}`, { status },{
        headers: {
            Authorization: `Bearer ${authUser}`,
        },
    });
};

const postFlowAll = (authUser, page, pageSize, status) => {
    return axiosInstance.post(`/flows/data/all?page=${page}&pageSize=${pageSize}`, { status },{
        headers: {
            Authorization: `Bearer ${authUser}`,
        },
    });
};

const getInvolved = (instanceId) => {
    return axiosInstance.get(`/flows/data/${instanceId}`)
};

const postAcceptTask = (authUser, taskId, approve, comment, role, approves) => {
    return axiosInstance.post(`/flows/data/completeTask`, { taskId, approve, comment, role, approves },{
        headers: {
            Authorization: `Bearer ${authUser}`,
        },
    });
};

export { getApproves,
         postFlows,
         getActiveTasks,
         postFlowAll,
         getInvolved,
         postAcceptTask
         }