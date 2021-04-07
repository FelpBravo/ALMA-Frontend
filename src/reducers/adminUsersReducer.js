import { types } from 'types/types';

const initialState = {
    openModal: false,
   
}

export const adminUsersReducer = (state = initialState, action) => {

    switch (action.type) {
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

        default:
            return state;
    }
};