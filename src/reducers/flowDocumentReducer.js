import { types } from 'types/types';

const initialState = {
    approvesList: [
        {
            "role": "owner",
            "label": "FLOW.OWNER.NAME",
            "order": 1,
            "mandatory": true
        },
        {
            "role": "co-author",
            "label": "FLOW.COAUTHOR.NAME",
            "order": 2,
            "mandatory": false
        },
        {
            "role": "stakeholder",
            "label": "FLOW.STAKEHOLDER.NAME",
            "order": 3,
            "mandatory": false
        },
        {
            "role": "reviewed",
            "label": "FLOW.REVIEWED.NAME",
            "order": 4,
            "mandatory": false
        },
        {
            "role": "approved",
            "label": "FLOW.APPROVED.NAME",
            "order": 5,
            "mandatory": false
        },
        {
            "role": "released",
            "label": "FLOW.RELEASED.NAME",
            "order": 6,
            "mandatory": true
        }
    ],
    tasksList: [],
    flowList:[]
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
        default:
            return state;
    }
};