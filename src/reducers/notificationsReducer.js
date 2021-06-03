import { types } from 'types/types';

export const initialState = {
    currentPage: 1,
    data: [],
    totalItems: 0,
    totalPages: 0,
    isInitialLoad: true,
}

export const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notificationsLoaded:
            return {
                ...action.payload,
                data: [ ...state.data, ...action.payload.data ]
            }
        
        case types.notificationsInitialLoad:
            return {
                ...state,
                isInitialLoad: false
            }

        case types.notificationsChangeState:
            return {
                ...state,
                ...action.payload
            }

        case types.notificationsReset:
            return {
                ...initialState,
            }

        default:
            return state;
    }

};