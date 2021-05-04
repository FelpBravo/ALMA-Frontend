import { types } from 'types/types';

const initialState = {
    profiles: null,
    policies: null,
    actionsModule: null,
    fields: [
        {
            name: "actionsModuleList",
            value: []
        }
    ],
}

export const modulePermissionsReducer = (state = initialState, action) => {
    const { payload } = action
    switch (action.type) {
        case types.addModulePermission:
            return {
                ...state,
                ...payload
            }
        
        case types.actionsModuleSetValueField:
            const newArray = state?.fields?.filter((e) => e?.name !== payload?.name)
            newArray.push(payload)
            return {
                ...state,
                fields: [...newArray]
            }

        case types.actionsModuleClear:
            return initialState

        default:
            return state;
    }
};