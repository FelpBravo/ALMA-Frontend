import { types } from 'types/types';

const initialState = {
    taglist: [],
    openModal: false,
    actionModal: '',
    tags: {
        id: 0,
        tag: '',
        hex: '',
        state: true,
    }
}

export const tagsReducer = (state = initialState, action) => {

	switch (action.type) {
		case types.tagsInitLoaded:
			return {
				...state,
				taglist: action.payload,
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

        case types.tagsDeleteLoaded:
        return {
            ...state,
				taglist: action.payload,
        }

        case types.tagsSetFolder:
			return {
				...state,
				tags: { ...action.payload }
            }
            
        case types.tagsSaveLoaded:
			return {
				...state,
				tags: {
					id: 0,
					tag: '',
				    hex: '',
					state: true,
				}
			}

        default:
			return state;
    }
};