import { types } from 'types/types';

const initialState = {
    documentId: "",
    token: "",
    fields: {}
}

export const sharedDocumentReducer = (state = initialState, action) => {

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

        default:
            return state;
    }
};