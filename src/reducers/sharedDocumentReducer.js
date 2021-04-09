import { types } from 'types/types';

const initialState = {
    documentId: "",
    token: "",
    fields: {},
    alive: null,
    passwordNeeded: null,
    fileName: "",
    errors: {}
}

export const sharedDocumentReducer = (state = initialState, action) => {
    const { payload } = action
    switch (action.type) {
        case types.sharedDocumentSetValue:
            const { name, value } = action.payload
            return {
                ...state,
                fields: { ...state.fields, [name]: value },
            }
        
        case types.saveSharedFile:
            const { token, documentId } = action.payload

            return {
                ...state,
                token,
                documentId,
            }
        
        case types.saveFileStatus:
            return {
                ...state,
                ...payload,
            }

        case types.sharedFieldClearErrors:
            return {
                ...state,
                errors:{},
            }

        default:
            return state;
    }
};