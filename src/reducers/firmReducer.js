import { types } from 'types/types';

const initialState = {
	signatures: []


}

export const firmReducer = (state = initialState, action) => {

	switch (action.type) {
		case types.firmDataLoaded:
			return {
				...state,
				signatures: action.payload,
			}
		case types.firmRemoveAll:
			return {
				signatures: [],
			}

		default:
			return state;
	}

};