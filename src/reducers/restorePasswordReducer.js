import { types } from 'types/types';

const initialState = {
    alive: null,
}

export const restorePasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.restorePasswordSaveStatus:
            return {
                ...state,
                alive: action.payload.alive,
            }

        default:
            return state;
    }
};