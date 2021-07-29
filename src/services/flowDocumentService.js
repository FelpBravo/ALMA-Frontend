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

/* const getInvolved = (instanceId) => {
    return axiosInstance.get(`/flows/data/${instanceId}`)
};
 */

const getInvolved = (authUser, instanceId) => {
    return axiosInstance.get(`/flows/data/${instanceId}`, {
        headers: {
            Authorization: `Bearer ${authUser}`,
        },
    });
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

const postFlowsSearch = ({authUser, text}) => {
    return axiosInstance.post(`flows/document/search`, {text}, {
        headers: {
            Authorization: `Bearer ${authUser}`,
        },
    });
};

const getDocumentCree = (authUser, fileId) => {
    return axiosInstance.get(`/flows/cre/${fileId}`, {
        headers: {
            Authorization: `Bearer ${authUser}`,
        },
    });
};
const postFlowsCree = (authUser, documents, approves , comment , fileId, maxDays) => {
    return axiosInstance.post(`/flows/cre`, {documents, approves ,comment, fileId, maxDays
    }, {
        headers: {
            Authorization: `Bearer ${authUser}`,
        },
    });
};

const getDataCree = (authUser, flowId) => {
    return axiosInstance.get(`/flows/cre/${flowId}/data`, {
        headers: {
            Authorization: `Bearer ${authUser}`,
        },
    });
};

const postFlowsCreeComplete = (authUser,taskId, approve) => {
    return axiosInstance.post(`/flows/cre/complete`, {taskId ,approve
    }, {
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
         postFlowsSearch, 
         getDocumentCree,
         postFlowsCree,
         getDataCree,
         postFlowsCreeComplete,
         }