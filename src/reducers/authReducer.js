import { types } from "types/types";

const INIT_STATE = {
	initURL: '',
	authUser: localStorage.getItem('token'),
};

const authReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case types.login:
			return {
				...state,
				authUser: action.payload
			}

		case types.logout:
			return {
				...state,
				authUser: null,
			}

		default:
			return state;
	}
}

export default authReducer;
