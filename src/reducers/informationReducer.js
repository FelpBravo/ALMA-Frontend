import { types } from 'types/types';

const initialState = {
	attachments: [],
    comments:[]

}

export const informationReducer = (state = initialState, action) => {

	switch (action.type) {
		case types.attachmentsDataLoaded:
			return {
				...state,
				attachments: action.payload
			}
		case types.commentsDataLoaded:
			return {
				...state,
				comments: action.payload
            }
		case types.informationRemoveAll:
			return {
				attachments: [],
				comments:[],

			}

		default:
			return state;
	}

};