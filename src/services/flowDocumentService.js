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

const postAcceptTask = (authUser, taskId, approve, comment, role, approves, file) => {

    const obj = {taskId , approve, comment, role, approves}

    const data = new FormData();
	data.append('files', file);
	data.append('content', JSON.stringify(obj) )

    return axiosInstance.post(`/flows/data/completeTask`, data,{
        headers: {
            Authorization: `Bearer ${authUser}`,
            'Content-Type': 'multipart/form-data'
        },
    });
};

const getCommentRole = (authUser, instanceId, role) => {
    return axiosInstance.get(`/flows/data/${instanceId}/comments?role=${role}`, {
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
         postAcceptTask,
         getCommentRole,
         }