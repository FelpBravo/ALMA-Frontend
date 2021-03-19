import { types } from 'types/types';

const initialState = {
	breadcrumbs: []


}

export const breadcrumbsReducer = (state = initialState, action) => {

	switch (action.type) {
		case types.createBreadcrumbs:
			return {
				...state,
				breadcrumbs: [{name:'Dashboard',path:'/dashboard'},action.payload],
			}
		case types.addBreadcrumbs:
			if(state.breadcrumbs.length > 2){
				state.breadcrumbs.pop()
			}
			return {
				...state,
				breadcrumbs: [...state.breadcrumbs,action.payload],
			}
		case types.breadcrumbsRemoveAll:
			return {
				breadcrumbs: [],
			}

		default:
			return state;
	}

};