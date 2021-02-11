import { types } from 'types/types';

const initialState = {
	audits: {},
}

export const auditReducer = (state = initialState, action) => {

	switch (action.type) {
		case types.auditDataLoaded:
			return {
				...state,
				audits: action.payload,
			}
		case types.auditRemoveAll:
				return {
					audits: {}
				}

		default:
			return state;
	}

};