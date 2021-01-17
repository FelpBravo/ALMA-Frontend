import { types } from "types/types";

const initialState = {
	documentsType: [],
	detailDocumentType: {},
}

export const documentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.docsDocumentsTypeLoaded:
			return {
				...state,
				documentsType: [...action.payload]
			}

		case types.docsDetailDocumentTypeLoaded:
			return {
				...state,
				detailDocumentType: { ...action.payload }
			}

		case types.docsRemoveAll:
			return {
				...state,
				documentsType: [],
				detailDocumentType: {},
			}
		case types.docsRemoveDetailDocumentType:
			return {
				...state,
				detailDocumentType: {},
			}

		default:
			return state;
	}
}