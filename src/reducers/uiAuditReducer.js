const { types } = require("types/types");

const initialState = {
	loader: false,
	alertMessage: null,
};

export const uiAuditReducer = (state = initialState, action) => {

	switch (action.type) {
		case types.uiAuditShowLoader:
			return {
				...state,
				loader: true,
			}

		case types.uiAuditFinishLoader:
			return {
				...state,
				loader: false,
			}

		default:
			return state;
	}

};