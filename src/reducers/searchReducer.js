import { types } from 'types/types';

const initialState = {
	fields: {},
	documents: {
		data: [],
	},
	versioning: {
		data: []
	},
	preview: '',
	cleanfilter: false,
	documentId: '',
	textSearch: '',
	openAdvanceSearch: false,
	openModal: false,
};

export const searchReducer = (state = initialState, action) => {

	switch (action.type) {
		case types.versioningLoaded:
			return {
				...state,
				versioning: action.payload.versioning,
				documentId: action.payload.id
			}
		case types.searchFieldsLoaded:
			return {
				...state,
				fields: action.payload,
			}
		case types.previewLoaded:
			return {
				...state,
				preview: action.payload,
			}
		case types.searchLoaded:
			return {
				...state,
				documents: action.payload,
			}

		case types.searchDocumentDeleted:
			return {
				...state,
				documents: action.payload,
			}
		case types.changeCleanFilter:
			return {
				...state,
				cleanfilter: true,
			}

			{/*	case types.searchDocumentDeleted:
				return {
					...state,
					documents: action.payload,
				}*/}
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
				versioning: {
					data: []
				},
				documentId: '',
				preview:''
			}
		case types.versioningRemove:
			return {
				...state,
				versioning: {
					data: []
				},
				documentId: '',
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
				},
				cleanfilter: true
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
				},
				cleanfilter: false
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

		case types.visibilityOpenModal:
			return {
				...state,
				openModal: true,
			}

		case types.visibilityCloseModal:
			return {
				...state,
				openModal: false,
			}

		case types.firmOpenModal:
			return {
				...state,
				openModal2: true,
			}

		case types.firmCloseModal:
			return {
				...state,
				openModal2: false,
			}

		case types.versioningOpenModal:
			return {
				...state,
				openModal3: true,
			}

		case types.versioningCloseModal:
			return {
				...state,
				openModal3: false,
			}

		default:
			return state;
	}

};