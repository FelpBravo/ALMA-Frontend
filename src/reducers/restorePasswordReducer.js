import { types } from 'types/types';

const initialState = {
    alive: null,
    processStatus: null,
    invalidCode: null,
}

export const restorePasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.restorePasswordSaveStatus:
            return {
                ...state,
                alive: action.payload.alive,
            }
        
        case types.restorePasswordSuccess:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
};