import { types } from 'types/types';

const initialState = [];

export const savedSearchesReducer = (state = initialState, action) => {

	switch (action.type) {

		case types.savedSearchesList:
			return [
				...state,
				...action.payload
			]

        case types.savedSearchesAddSearch:
			return [
				...state,
				{...action.payload}
			]

		default:
			return state;
	}
};