import { types } from 'types/types';

const initialState = {
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

        default:
            return state;
    }
};