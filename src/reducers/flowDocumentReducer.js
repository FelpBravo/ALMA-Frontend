import { types } from 'types/types';

const initialState = {
    approvesList: [],
    tasksList: [],
    flowList: [],
    involved: [],
    dataId: [],
    role: [],
    author: [],
    fileId: [],
    expiresAt: [],
    initialApprovers: [],
    flowId: null,
    form: {},
    commentList: [],
    file: [],
    names: [],
    docCree: "",
    dataCREE: [],
    type: "",
    commentTransv:[],
}

export const flowDocumentReducer = (state = initialState, action) => {
    const { payload } = action
    switch (action.type) {
        case types.approvesListLoaded:
            return {
                ...state,
                approvesList: payload
            }
        case types.tasksListLoaded:
            return {
                ...state,
                tasksList: payload
            }
        case types.flowListLoaded:
            return {
                ...state,
                flowList: payload
            }
        case types.involvedListLoaded:
            return {
                ...state,
                flowId: action.payload.instanceId,
                involved: action.payload.involved,
                taskId: action.payload.taskId,
                role: action.payload.role,
                author: action.payload.author,
                fileId: action.payload.fileId,
                expiresAt: action.payload.expiresAt,
                type: action.payload.type,
            }
        case types.dataCreeInitFlow:
            return {
                ...state,
                flowId: action.payload.instanceId,
                dataCREE: action.payload.dataCREE,
                taskId: action.payload.taskId,
                role: action.payload.role,
                author: action.payload.author,
                fileId: action.payload.fileId,
                expiresAt: action.payload.expiresAt,
                type: action.payload.type,
            }

        case types.initialApproversLoaded:
            return {
                ...state,
                initialApprovers: payload
            }

        case types.manageSetValueField:
            return {
                ...state,
                file: action.payload.file,
                names: action.payload.names,
                form: {
                    ...state?.form,
                    [action.payload.name]: action.payload.value
                }
            }
        case types.commentListLoaded:
            return {
                ...state,
                commentList: payload
            }
        case types.docInitCree:
            return {
                ...state,
                docCree: payload
            }
           
        case types.typeInitCree:
            return {
                ...state,
                type: action.payload.type,
                taskId: action.payload.taskId,

            }
        case types. commentTransvLoaded:
            return {
                ...state,
                commentTransv: payload
               
            }

        default:
            return state;
    }
};