import {
    getActionsByModule, getPolicies, getProfiles, getActionsByModuleByPolicy, saveProfilePolicies, saveActionsModuleByPolicy
 } from "services/permissionService";
import { types } from "types/types";

export const startGetProfiles = (authUser) => {

    return async (dispatch) => {
        try {

            const resp = await getProfiles(authUser);
            console.log("resp", resp.data)
            dispatch(profilesInitLoaded(resp.data));

        } catch (error) {
            console.log(error);
        } finally {
            // Swal.close();
        }

    }
};

export const startGetPolicies = (authUser) => {

    return async (dispatch) => {
        try {

            const resp = await getPolicies(authUser);
            console.log("resp", resp.data)
            dispatch(policiesInitLoaded(resp.data));

        } catch (error) {
            console.log(error);
        } finally {
            // Swal.close();
        }

    }
};



export const startPermissionsModuleLoading = (authUser) => {

    return async (dispatch) => {
        try {

            const resp = await getActionsByModule(authUser);
            console.log("resp", resp)
            dispatch(actionsModuleInitLoaded(resp.data));

        } catch (error) {
            console.log(error);
        } finally {
            // Swal.close();
        }

    }
};


export const startGetActionsByModuleByPolicy = ({ authUser, policyId}, setData) => {

    return async (dispatch) => {
        try {

            const resp = await getActionsByModuleByPolicy(authUser, policyId);
            setData(resp?.data)

        } catch (error) {
            console.log(error);
        } finally {
            // Swal.close();
        }

    }
};

export const startSaveActionsModuleByPolicy = ({ authUser, policyId, data}) => {

    return async (dispatch) => {
        try {

            const resp = await saveActionsModuleByPolicy(authUser, policyId, data);
            console.log("resp", resp)
            // dispatch(searchLoaded(resp.data));

        } catch (error) {
            console.log(error);
        } finally {
            // Swal.close();
        }

    }
};

export const startSaveProfilePolicies = ({ authUser, policyId, data }) => {

    return async (dispatch) => {
        try {

            const resp = await saveProfilePolicies(authUser, policyId, data);
            console.log("resp", resp)
            // dispatch(searchLoaded(resp.data));

        } catch (error) {
            console.log(error);
        } finally {
            // Swal.close();
        }

    }
};

export const profilesInitLoaded = (profiles) => {
    return {
        type: types.addModulePermission,
        payload: {profiles},
    }
};

export const policiesInitLoaded = (policies) => {
    return {
        type: types.addModulePermission,
        payload: { policies },
    }
};

export const actionsModuleInitLoaded = (actionsModule) => {
    return {
        type: types.addModulePermission,
        payload: { actionsModule },
    }
};

export const actionsModuleSetValueField = (name, value) => {
    return {
        type: types.actionsModuleSetValueField,
        payload: {
            name,
            value
        }
    }
};
