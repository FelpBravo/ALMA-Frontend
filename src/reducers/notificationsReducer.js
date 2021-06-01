import { types } from 'types/types';

const initialState = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
}

export const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notificationsLoaded:
            return {
                ...action.payload,
                data: [ ...state.data, ...action.payload.data ]
            }

        default:
            return state;
    }

};