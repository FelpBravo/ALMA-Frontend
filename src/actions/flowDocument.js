import Swal from 'sweetalert2';

import { getActiveTasks, getApproves, getInvolved, postAcceptTask, postFlowAll, postFlows } from 'services/flowDocumentService';
import { types } from 'types/types';

import { GENERAL_ERROR } from '../constants/constUtil';

export const startApprovesListLoading = ({ authUser, flowName }) => {
    return async (dispatch) => {

        try {

            const resp = await getApproves(authUser, flowName);

            dispatch(approvesLoaded(resp.data));

        } catch (error) {
            console.log(error);
        }

    }
};
export const startInitFlowsLoading = ( authUser, data, callback) => {
    return async (dispatch) => {

        try {
            Swal.showLoading();

            const {flow, document, approves, comment, startedBy} = data
            const resp = await postFlows(authUser, flow, document, approves, comment, startedBy);
            const {value} = await Swal.fire({
				icon: 'success',
				width: 400,
				title: '<h4>Solicitud enviada</h4>',
				html: `<ul>ID Asignado: ${resp.data}</ul>`,
				showConfirmButton: true,
			})
            
            dispatch(saveFlowInit());
            if (value){
                callback && callback()
            }
		} catch (error) {
			console.log(error);

			Swal.close();

			const message = error?.response?.data?.message ? error.response.data.message : GENERAL_ERROR;

			Swal.fire({
				title: 'Error', text: message, icon: 'error', heightAuto: false
			});
		}

	}
};

export const startEditFlowsLoading = (authUser, data, callback) => {
    return async (dispatch) => {

        try {
            Swal.showLoading();

            const { taskId, approve, approves, comment, role } = data
            const resp = await postAcceptTask(authUser, taskId, approve, comment, role, approves);
            //dispatch(saveFlowInit());
            callback && callback()
        } catch (error) {
            console.log(error);

            Swal.close();

            const message = error?.response?.data?.message ? error.response.data.message : GENERAL_ERROR;

            Swal.fire({
                title: 'Error', text: message, icon: 'error', heightAuto: false
            });
        }

    }
};

export const startActiveTasksInit = ( authUser, page, status) => {
    return async (dispatch) => {

        try {
            const resp = await getActiveTasks(authUser, page, 10, status);

            dispatch(listActiveTasks(resp.data));

        } catch (error) {
            console.log(error);
        }

    }
};

export const startFlowsAllInit = ( authUser, page, status ) => {
    return async (dispatch) => {

        try {
            const resp = await postFlowAll(authUser, page, 10, status);

            dispatch(listFlows(resp.data));

        } catch (error) {
            console.log(error);
        }

    }
};

export const startInvolvedLoading = (authUser, instanceId, taskId, role, author, fileId, expiresAt) => {
    return async (dispatch) => {

        try {

            const resp = await getInvolved(instanceId);
         
            dispatch(involvedLoaded(resp.data, taskId, role, author, fileId, expiresAt));
          
        } catch (error) {
            console.log(error);
        }

    }
};

export const startAcceptTasksInit = ( authUser, taskId, approve, comment, role) => {
    return async (dispatch) => {

        try {
            const resp = await postAcceptTask(authUser,taskId, approve, comment, role);

            dispatch(respAcceptTask(resp));

        } catch (error) {
            console.log(error);
        }

    }
};

const saveFlowInit = () => {
	return {
		type: types.docsSaveFlowInit,
	}
};
    
const approvesLoaded = (approvesList) => {
    return {
        type: types.approvesListLoaded,
        payload: approvesList
    }
};

const flowsInitLoaded = (flows) => {
    return {
        type: types.flowsLoaded,
        payload: flows
    }
};

const listActiveTasks = (tasksList) => {
    return {
        type: types.tasksListLoaded,
        payload: tasksList
    }
};

const listFlows = (flowList) => {
    return {
        type: types.flowListLoaded,
        payload: flowList
    }
};
const involvedLoaded = (involved, taskId, role, author, fileId, expiresAt) => {
    return {
        type: types.involvedListLoaded,
        payload: {
            involved: involved,
            taskId: taskId,
            role: role,
            author: author,
            fileId: fileId,
            expiresAt: expiresAt,
        }
                
    }
};

const respAcceptTask = (resptask) => {
    return {
        type: types.taskResp,
        payload: resptask
    }
};

export const startGetInvolvedLoading = (flowId) => {
    return async (dispatch) => {

        try {

            const resp = await getInvolved(flowId);
            dispatch(initalApprovesLoaded(resp.data));

        } catch (error) {
            console.log(error);
        }

    }
};

const initalApprovesLoaded = (approvesList) => {
    return {
        type: types.initialApproversLoaded,
        payload: approvesList
    }
};