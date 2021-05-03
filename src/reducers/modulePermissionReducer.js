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
            console.log("state", state)
            const newArray = state?.fields?.filter((e) => e?.name !== payload?.name)
            console.log("newArray", newArray)
            newArray.push(payload)
            return {
                ...state,
                fields: [...newArray]
            }

        default:
            return state;
    }
};