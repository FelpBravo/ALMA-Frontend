import { types } from 'types/types';

const initialState = {
    openModal: false,
    userslist: [],
    openModal1: false,
   
}

export const adminUsersReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.usersInitLoaded:
            return {
                ...state,
                userslist: action.payload,
            }
        case types.usersOpenModal:
            return {
                ...state,
                openModal: true,
            }

        case types.usersCloseModal:
            return {
                ...state,
                openModal: false,
            }
        case types.usersEditOpenModal:
            return {
                ...state,
                openModal1: true,
                }
    
        case types.usersEditCloseModal:
            return {
                ...state,
                openModal1: false,
                }
    

    

        default:
            return state;
    }
};