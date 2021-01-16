import data from 'components/ui/components/ToDoCard/data';
import { types } from 'types/types';

const initialState = {
	fields: {},
	documents: {
		data: [],
	},
	textSearch: '',
	openAdvanceSearch: false,
};

export const searchReducer = (state = initialState, action) => {

	switch (action.type) {
		case types.searchFieldsLoaded:
			return {
				...state,
				fields: action.payload,
			}

		case types.searchLoaded:
			return {
				...state,
				documents: action.payload,
			}

		case types.searchDocumentDeleted:
			return {
				...state,
				documents: {
					...state.documents,
					totalItems: state.documents.totalItems - 1,
					data: state.documents.data.filter(d => d.id !== action.payload)
				},
			}

		case types.searchSetText:
			return {
				...state,
				textSearch: action.payload,
			}

		case types.searchRemoveText:
			return {
				...state,
				textSearch: '',
			}

		case types.searchRemoveAll:
			return {
				...state,
				fields: {},
				documents: {},
				textSearch: '',
			}

		case types.searchSetValueFilter:
			return {
				...state,
				fields: {
					...state.fields,
					filters: state.fields.filters.map(filter => {

						if (filter.name === action.payload.name) {
							filter.value = action.payload.value;
						}

						return filter;
					}),
				}
			}

		case types.searchClearAllFilters:
			return {
				...state,
				fields: {
					...state.fields,
					filters: state.fields.filters.map(filter => {

						if (filter.value) {
							delete filter.value;
						}

						return filter;
					}),
				}
			}

		case types.searchSubscribeDocumentFinish:
			return {
				...state,
				documents: {
					...state.documents,
					data: state.documents.data.map(doc => {

						if (doc.id === action.payload) {
							doc.isFavorite = !doc.isFavorite;
						}

						return doc;

					}),
				}
			}

		default:
			return state;
	}

};