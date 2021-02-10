import { types } from "types/types";
import jwt_decode from 'jwt-decode'

let listAuthorities = []

try {
	const { authorities } = jwt_decode(localStorage.getItem('token'))
	listAuthorities = authorities
} catch (error) {
	console.log("Acceso invalido");
}


const INIT_STATE = {
	initURL: '',
	authUser: localStorage.getItem('token'),
	authorities: listAuthorities,
	
};

const authReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case types.login:
			return {
				...state,
				authUser: action.payload.authUser,
				authorities:action.payload.authorities
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
