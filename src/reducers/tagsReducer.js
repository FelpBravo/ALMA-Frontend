import { types } from 'types/types';

const initialState = {
    tagslist: [],
    openModal: false,
}

export const tagsReducer = (state = initialState, action) => {

	switch (action.type) {
		case types.tagsInitLoaded:
			return {
				...state,
				tagslist: action.payload,
            }
            
        case types.tagsOpenModal:
        return {
            ...state,
            openModal: true,
        }

        case types.tagsCloseModal:
        return {
            ...state,
            openModal: false,
        }

        case types.tagsSetActionModal:
        return {
            ...state,
            actionModal: action.payload,
        }
        
        default:
			return state;
    }
};