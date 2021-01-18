import { types } from "types/types";

const initialState = {
	documentsType: [],
	detailDocumentType: {
		aspectList: [],
	},
	fileIdLoaded: '',
	folderId: '',
	thumbnail: null,
	thumbnailGenerated: false,
	openModalMultiSelect: false,
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
				detailDocumentType: {
					aspectList: [],
				},
				fileIdLoaded: '',
				folderId: '',
				thumbnail: null,
				thumbnailGenerated: false,
				openModalMultiSelect: false,
			}

		case types.docsRemoveDetailDocumentType:
			return {
				...state,
				detailDocumentType: {},
			}

		case types.docsSaveThumbnail:
			return {
				...state,
				thumbnail: action.payload,
			}

		case types.docsSetValueField:
			return {
				...state,
				detailDocumentType: {
					...state.detailDocumentType,
					aspectList: state.detailDocumentType.aspectList.map((field) => {

						const { sectionId, name, value } = action.payload;

						if (field.id === sectionId) {

							field.customPropertyList = field.customPropertyList.map((property) => {

								if (property.name === name) {
									property.value = value;
								}

								return property;

							});

						}

						return field;

					}),
				}
			}

		case types.docsSaveFolderId:
			return {
				...state,
				folderId: action.payload,
			}

		case types.docsSaveFileIdLoaded:
			return {
				...state,
				fileIdLoaded: action.payload,
			}

		case types.docsSaveThumbnailGenerated:
			return {
				...state,
				thumbnailGenerated: action.payload,
			}

		case types.docsSaveFormFinish:
			return {
				...state,
				detailDocumentType: {
					aspectList: [],
				},
				fileIdLoaded: '',
				folderId: '',
				thumbnail: null,
				thumbnailGenerated: false,
				openModalMultiSelect: false,
			}

		case types.docsClear:
			return {
				...state,
				detailDocumentType: {
					aspectList: [],
				},
				fileIdLoaded: '',
				folderId: '',
				thumbnail: null,
				thumbnailGenerated: false,
			}

		case types.docsOpenModalMultiSelect:
			return {
				...state,
				openModalMultiSelect: true,
			}

		case types.docsCloseModalMultiSelect:
			return {
				...state,
				openModalMultiSelect: false,
			}

		default:
			return state;
	}
}