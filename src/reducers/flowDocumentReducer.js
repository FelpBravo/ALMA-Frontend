import { types } from 'types/types';

const initialState = {
    approvesList: [
        {
            "name": "owner",
            "label": "FLOW.OWNER.NAME",
            "order": 1,
            "mandatory": true
        },
        {
            "name": "co-author",
            "label": "FLOW.COAUTHOR.NAME",
            "order": 2,
            "mandatory": false
        },
        {
            "name": "stakeholder",
            "label": "FLOW.STAKEHOLDER.NAME",
            "order": 3,
            "mandatory": false
        },
        {
            "name": "reviewed",
            "label": "FLOW.REVIEWED.NAME",
            "order": 4,
            "mandatory": false
        },
        {
            "name": "approved",
            "label": "FLOW.APPROVED.NAME",
            "order": 5,
            "mandatory": false
        },
        {
            "name": "released",
            "label": "FLOW.RELEASED.NAME",
            "order": 6,
            "mandatory": true
        }
    ],
}

export const flowDocumentReducer = (state = initialState, action) => {
    const { payload } = action
    switch (action.type) {
        case types.approvesListLoaded:
            return {
                ...state,
                approvesList: payload
            }

        default:
            return state;
    }
};