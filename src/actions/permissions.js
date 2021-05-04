import {
    getActionsByModule, getPolicies, getProfiles, getActionsByModuleByPolicy, saveProfilePolicies, saveActionsModuleByPolicy
 } from "services/permissionService";
import { types } from "types/types";
import Swal from 'sweetalert2';
import { GENERAL_ERROR } from "constants/constUtil";

export const startGetProfiles = (authUser) => {

    return async (dispatch) => {
        try {

            const resp = await getProfiles(authUser);
            dispatch(profilesInitLoaded(resp.data));

        } catch (error) {
            console.log(error);
        }
        
    }
};

export const startGetPolicies = (authUser) => {

    return async (dispatch) => {
        try {

            const resp = await getPolicies(authUser);
            dispatch(policiesInitLoaded(resp.data));

        } catch (error) {
            console.log(error);
        }

    }
};



export const startPermissionsModuleLoading = (authUser) => {

    return async (dispatch) => {
        try {

            const resp = await getActionsByModule(authUser);
            dispatch(actionsModuleInitLoaded(resp.data));

        } catch (error) {
            console.log(error);
        }

    }
};


export const startGetActionsByModuleByPolicy = ({ authUser, policyId }, setData, setLoading) => {

    return async (dispatch) => {
        try {

            const resp = await getActionsByModuleByPolicy(authUser, policyId);
            setData(resp?.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            const message = error?.response?.data?.message ? error.response.data.message : GENERAL_ERROR;

            Swal.fire({
                title: 'Error', text: message, icon: 'error', heightAuto: false
            });
        } finally {
            // Swal.close();
        }

    }
};

export const startSaveActionsModuleByPolicy = ({ authUser, policyId, data }, setLoadingSubmit) => {

    return async (dispatch) => {
        try {
            await saveActionsModuleByPolicy(authUser, policyId, data);
            setLoadingSubmit(false)
            Swal.fire({
                title: 'Guardado con éxito', icon: 'success', heightAuto: false
            });
        } catch (error) {
            console.log(error);
        }

    }
};

export const startSaveProfilePolicies = ({ authUser, policyId, data }) => {

    return async (dispatch) => {
        try {

        await saveProfilePolicies(authUser, policyId, data);

        } catch (error) {
            console.log(error);
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

export const actionsModuleClear = () => {
    return {
        type: types.actionsModuleClear,
        payload: {}
    }
};
