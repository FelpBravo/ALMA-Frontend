import { types } from 'types/types';

const initialState = {
    currentPage: 1,
    data: [],
    totalItems: 0,
    totalPages: 0,
    isInitialLoad: true,
}

// const mergeData = (arr1, arr2) => {
//     const arr3 = arr1;
//     arr2.map( e => 
//         )
// }
// const exist = 
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


        default:
            return state;
    }

};