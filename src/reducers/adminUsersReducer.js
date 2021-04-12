import { types } from 'types/types';

const initialState = {
    openModal: false,
    userslist: [],
    validateNickname: false,
   
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
        case types.usersValidateNickname:
            return {
                ...state,
                validateNickname: action.payload
                }
    

    

        default:
            return state;
    }
};