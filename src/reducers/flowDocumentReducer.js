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
    form: {}
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
                }
  
        case types.initialApproversLoaded:
            return {
                ...state,
                initialApprovers: payload
            }

        case types.manageSetValueField:
            return {
                ...state,
                form: {
                    ...state?.form,
                    [action.payload.name]: action.payload.value
                }
            }


        default:
            return state;
    }
};