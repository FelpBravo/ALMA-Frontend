import {
    getActionsByModule, getPolicies, getProfiles, getActionsByModuleByPolicy, saveProfilePolicies, saveActionsModuleByPolicy
 } from "services/permissionService";

export const startGetProfiles = (authUser) => {

    return async (dispatch) => {
        try {

            const resp = await getProfiles(authUser);
            console.log("resp", resp)
            // dispatch(searchLoaded(resp.data));

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
            console.log("resp", resp)
            // dispatch(searchLoaded(resp.data));

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
            // dispatch(searchLoaded(resp.data));

        } catch (error) {
            console.log(error);
        } finally {
            // Swal.close();
        }

    }
};


export const startGetActionsByModuleByPolicy = ({ authUser, policyId}) => {

    return async (dispatch) => {
        try {

            const resp = await getActionsByModuleByPolicy(authUser, policyId);
            console.log("resp", resp)
            // dispatch(searchLoaded(resp.data));

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