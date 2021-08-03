import Swal from 'sweetalert2';

import { getActiveTasks, getApproves, getCommentRole, getInvolved, postAcceptTask, postFlowAll, postFlows, getDocumentCree, postFlowsCree, getDataCree, postFlowsCreeComplete, getInvolvedCree, getCommentRoleCree, deleteCree, postCreeComments, getCommentCree, deleteGeneral } from 'services/flowDocumentService';
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
export const startInitFlowsLoading = (authUser, data, needCopy, callback) => {
    return async (dispatch) => {

        try {
            Swal.showLoading();

            const { flow, document, approves, comment, startedBy } = data
            const resp = await postFlows(authUser, flow, document, approves, comment, startedBy, needCopy);
            const { value } = await Swal.fire({
                icon: 'success',
                width: 400,
                title: '<h4>Solicitud enviada</h4>',
                html: `<ul>ID Asignado: ${resp.data}</ul>`,
                showConfirmButton: true,
            })

            dispatch(saveFlowInit());
            if (value) {
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
            Swal.close();

            const { value } = await Swal.fire({
                icon: 'success',
                width: 400,
                title: '<h4>Tarea finalizada con éxito</h4>',
                showConfirmButton: true,
            })

            if (value) {
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

export const startActiveTasksInit = (authUser, page, status) => {
    return async (dispatch) => {

        try {
            const resp = await getActiveTasks(authUser, page, 10, status);

            dispatch(listActiveTasks(resp.data));

        } catch (error) {
            console.log(error);
        }

    }
};

export const startFlowsAllInit = (authUser, page, status) => {
    return async (dispatch) => {

        try {
            const resp = await postFlowAll(authUser, page, 10, status);

            dispatch(listFlows(resp.data));

        } catch (error) {
            console.log(error);
        }

    }
};

export const startInvolvedLoading = (authUser, instanceId, taskId, role, author, fileId, expiresAt, type) => {
    return async (dispatch) => {

        try {

            const resp = await getInvolved(authUser, instanceId);

            dispatch(involvedLoaded(resp.data, taskId, instanceId, role, author, fileId, expiresAt, type));

        } catch (error) {
            console.log(error);
        }

    }
};

export const startAcceptTasksInit = (authUser, taskId, approve, comment, role , approves,  file ) => {
    return async (dispatch) => {

        try {
            const resp = await postAcceptTask(authUser, taskId, approve, comment, role, approves, file);

            dispatch(respAcceptTask(resp));

        } catch (error) {
            console.log(error);
        }

    }
};

export const CommentRoleInit = (authUser, instanceId, role) => {
    return async (dispatch) => {

        try {
            const resp = await getCommentRole(authUser, instanceId, role);

            dispatch(commentsRole(resp.data));

        } catch (error) {
            console.log(error);
        }

    }
};

export const CommentRoleCreeInit = (authUser, instanceId, taskId) => {
    return async (dispatch) => {

        try {
            const resp = await  getCommentRoleCree(authUser, instanceId, taskId);

            dispatch(commentsRole(resp.data));

        } catch (error) {
            console.log(error);
        }

    }
};

const commentsRole = (commentList) => {
    return {
        type: types.commentListLoaded,
        payload: commentList
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
const involvedLoaded = (involved, taskId, instanceId, role, author, fileId, expiresAt, type) => {
    return {
        type: types.involvedListLoaded,
        payload: {
            instanceId,
            involved: involved,
            taskId: taskId,
            role: role,
            author: author,
            fileId: fileId,
            expiresAt: expiresAt,
            type: type,
        }

    }
};

const respAcceptTask = (resptask) => {
    return {
        type: types.taskResp,
        payload: resptask
    }
};

export const startGetInvolvedLoading = (authUser,flowId) => {
    return async (dispatch) => {

        try {

            const resp = await getInvolved(authUser,flowId);
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

export const manageSetValueField = (name, value) => ({
    type: types.manageSetValueField,
    payload: {
        name,
        value,
        
    }
});

export const starDocumentCreeInit= ({ authUser, id }) => {
    return async (dispatch) => {

        try {

            const resp = await getDocumentCree(authUser, id);

            dispatch(docInitCree(resp.data));

        } catch (error) {
            console.log(error);
        }

    }
};

const docInitCree = (docCree) => {
    return {
        type: types.docInitCree,
        payload: docCree
    }
};

export const startInitFlowsCreeLoading = (authUser, data, callback) => {
    return async (dispatch) => {

        try {
            Swal.showLoading();

            const { documents, approves, comment, fileId, maxDays } = data
            const resp = await postFlowsCree(authUser, documents, approves, comment, fileId, maxDays);
            const { value } = await Swal.fire({
                icon: 'success',
                width: 400,
                title: '<h4>Solicitud enviada</h4>',
                html: `<ul>ID Asignado: ${resp.data}</ul>`,
                showConfirmButton: true,
            })

            dispatch(saveFlowInit());
            if (value) {
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

export const startDataCreeInit = (authUser, instanceId, taskId, role, author, fileId, expiresAt, type) => {
    return async (dispatch) => {

        try {

            const resp = await getDataCree(authUser, instanceId);

            dispatch(involvedLoaded(resp.data, taskId, instanceId, role, author, fileId, expiresAt, type));

        } catch (error) {
            console.log(error);
        }

    }
};

/* const dataCreeInit = (dataCREE, taskId, instanceId, role, author, fileId, expiresAt, type) => {
    return {
        type: types.dataCreeInitFlow,
        payload: {
            instanceId,
            dataCREE: dataCREE,
            taskId: taskId,
            role: role,
            author: author,
            fileId: fileId,
            expiresAt: expiresAt,
            type: type
        }

    }
}; */

export const startAcceptTasksCreeInit = (authUser, taskId, approve) => {
    return async (dispatch) => {

        try {
            const resp = await postFlowsCreeComplete(authUser, taskId, approve);

            dispatch(respAcceptTask(resp));

        } catch (error) {
            console.log(error);
        }

    }
};

export const startGetInvolvedCreeLoading = (authUser,flowId) => {
    return async (dispatch) => {

        try {

            const resp = await getInvolvedCree(authUser,flowId);
            dispatch(initalApprovesLoaded(resp.data));

        } catch (error) {
            console.log(error);
        }

    }
};

 export const typeInitCree = (type, taskId) => {
    return {
        type: types.typeInitCree,
        payload: {
            type:type,
            taskId:taskId,
        }
    }
};

export const startAcceptTasksCreeEdit = (authUser, taskId, data) => {
    return async (dispatch) => {

        try {
            const { approves, comment} = data
            console.log( taskId)
            const resp = await postFlowsCreeComplete(authUser, taskId, undefined , comment, undefined, approves);

            dispatch(respAcceptTask(resp));

        } catch (error) {
            console.log(error);
        }

    }
};

export const CancelCree = (authUser, flowId) => {
    return async (dispatch) => {

        try {
            const resp = await deleteCree(authUser, flowId);

        } catch (error) {
            console.log(error);
        }

    }
};

export const CancelGeneral = (authUser, flowId) => {
    return async (dispatch) => {

        try {
            const resp = await deleteGeneral(authUser, flowId);

        } catch (error) {
            console.log(error);
        }

    }
};

export const startCommentsCreeInit = (authUser, flowId, taskId, content, file) => {
    return async (dispatch) => {

        try {
            //const resp = await postCreeComments(authUser, folwId, taskId, comments, file);
            await postCreeComments(authUser, flowId, taskId, content, file).then(async() => {
                const resp = await getCommentCree(authUser, flowId)
                dispatch(commentsRole(resp.data))
            })
            //dispatch((resp));

        } catch (error) {
            console.log(error);
        }

    }
};
export const commentCreeTransv = (authUser, instanceId) => {
    return async (dispatch) => {

        try {
            const resp = await getCommentCree(authUser, instanceId);

            dispatch(commentsRole(resp.data));

        } catch (error) {
            console.log(error);
        }

    }
};

/* const commentsCreeTransInit = (commentTransv) => {
    return {
        type: types.commentTransvLoaded,
        payload: commentTransv
    }
}; */
