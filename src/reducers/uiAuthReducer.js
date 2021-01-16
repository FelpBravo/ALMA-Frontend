import { types } from "types/types";

const initialState = {
	loader: false,
	alertMessage: null,
};

export const uiAuthReducer = (state = initialState, action) => {

	switch (action.type) {
		case types.uiLoginShowLoader:
			return {
				...state,
				loader: true,
			}

		case types.uiLoginFinishLoader:
			return {
				...state,
				loader: false,
			}

		case types.uiLoginShowMessageError:
			return {
				...state,
				alertMessage: action.payload,
			}

		case types.uiLoginRemoveMessageError:
			return {
				...state,
				alertMessage: null,
			}

		default:
			return {
				...state
			}
	}

}