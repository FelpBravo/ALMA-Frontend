import { axiosInstance } from '../config/axios-instance';

const getProfiles = (authUser) => {
    return axiosInstance.get(`/users/permissions/profiles`,
        {
            headers: {
                Authorization: `Bearer ${authUser}`,
            },
        }
    );
}

const getPolicies = (authUser) => {
    return axiosInstance.get(`/users/permissions/policies`,
        {
            headers: {
                Authorization: `Bearer ${authUser}`,
            },
        }
    );
}

const getActionsByModule = (authUser) => {
    return axiosInstance.get(`/users/permissions/actions-module/`,
        {
            headers: {
                Authorization: `Bearer ${authUser}`,
            },
        }
    );
}

const getActionsByModuleByPolicy = (authUser, policyId) => {
    return axiosInstance.get(`/users/permissions/policies/${policyId}/actions-module`,
        {
            headers: {
                Authorization: `Bearer ${authUser}`,
            },
        }
    );
}

const saveActionsModuleByPolicy = (authUser, policyId, data) => {
    return axiosInstance.post(`/users/permissions/policies/${policyId}/actions-module`,
        data,
        {
            headers: {
                Authorization: `Bearer ${authUser}`,
            },
        }
    );
}

const saveProfilePolicies = (authUser, policyId, data) => {
    return axiosInstance.post(`/users/permissions/profiles/${policyId}/policies`,
        data,
        {
            headers: {
                Authorization: `Bearer ${authUser}`,
            },
        }
    );
}



export { getActionsByModule, getProfiles, getPolicies, getActionsByModuleByPolicy, saveActionsModuleByPolicy, saveProfilePolicies }