import { types } from 'types/types';

const initialState = {
	reports: {
		data:[]
	},
	missing: {
		data:[]
	},
	date:{
		startDate: '',
		endDate:''
	}
}

export const reportsReducer = (state = initialState, action) => {

	switch (action.type) {
		case types.reportsDataLoaded:
			return {
				...state,
				reports: action.payload.reports,
				date: action.payload.date
			}
		case types.reportsRemoveAll:
				return {
					reports: {},
					missing: {}
				}

		default:
			return state;
	}

};