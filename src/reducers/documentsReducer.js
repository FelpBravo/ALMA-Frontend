import { setFolders } from 'helpers/setFolders';
import { types } from 'types/types';

const initialState = {
	documentsType: [],
	detailDocumentType: {
		aspectList: [],
	},
	fileIdLoaded: '',
	folderId: '',
	folderName: '',
	thumbnail: null,
	thumbnailGenerated: false,
	tags: [],
	tagsSelected: [],
	versioningType: '',
	versioningComments: '',
	folders: [],
	historyFoldersBreadcrumbs: [
		{
			id: 0,
			name: '#',
		}
	],
	currentFolderBreadcrumbs: {
		id: 0,
		name: '#',
		folders: []
	},
	loadingFolderModal: false,
	docs: {},
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
				folderName: '',
				thumbnail: null,
				thumbnailGenerated: false,
				tags: [],
				versioningType: '',
				versioningComments: '',
				folders: [],
				historyFoldersBreadcrumbs: [
					{
						id: 0,
						name: '#',
					}
				],
				currentFolderBreadcrumbs: { id: 0, name: '#', folders: [] },
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

		case types.docsSaveFolderName:
			return {
				...state,
				folderName: action.payload,
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
				folderName: '',
				thumbnail: null,
				thumbnailGenerated: false,
				//tags: [],
				versioningType: '',
				versioningComments: '',
				//folders: [],
				historyFoldersBreadcrumbs: [
					{
						id: 0,
						name: '#',
					}
				],
				currentFolderBreadcrumbs: { id: 0, name: '#', folders: [...state.folders] },
				tagsSelected: [],
			}

		case types.docsClear:
			return {
				...state,
				detailDocumentType: {
					aspectList: [],
				},
				fileIdLoaded: '',
				folderId: '',
				folderName: '',
				thumbnail: null,
				thumbnailGenerated: false,
				//tags: [],
				tagsSelected: [],
				versioningType: '',
				versioningComments: '',
				//folders: [],
				historyFoldersBreadcrumbs: [
					{
						id: 0,
						name: '#',
					}
				],
				currentFolderBreadcrumbs: { id: 0, name: '#', folders: [...state.folders] },
			}

		case types.docsDocumentByIdLoaded:
			return {
				...state,
				detailDocumentType: { ...action.payload.aspectGroup },
				fileIdLoaded: action.payload.fileId,
				folderId: action.payload.folderId,
				tagsSelected: [...action.payload.tags],
			}

		case types.docsDocumentByIdVisibility:
			return {
				...state,
				docs: action.payload,
			}	

		case types.docsTagsLoaded:
			return {
				...state,
				tags: [...action.payload],
			}

		case types.docsSaveVersioningType:
			return {
				...state,
				versioningType: action.payload,
			}

		case types.docsClearVersioningType:
			return {
				...state,
				versioningType: '',
			}

		case types.docsSaveVersioningComments:
			return {
				...state,
				versioningComments: action.payload,
			}

		case types.docsClearVersioningComments:
			return {
				...state,
				versioningComments: '',
			}

		case types.docsFoldersLoaded:
			return {
				...state,
				folders: [...action.payload],
			}

		case types.docsSetSubFoldersToFolder:
			return {
				...state,
				folders: state.folders.map((folder => {

					const { folderId, folders } = action.payload;

					setFolders(folderId, folders, folder);

					return folder;

				})),
			}

		case types.docsSaveHistoryFoldersBreadcrumbs:
			return {
				...state,
				historyFoldersBreadcrumbs: [...state.historyFoldersBreadcrumbs, action.payload],
			}

		case types.docsSaveCurrentFolderBreadcrumbs:
			return {
				...state,
				currentFolderBreadcrumbs: { ...action.payload }
			}

		case types.docsUpdateHistoryFoldersBreadcrumbs:
			return {
				...state,
				historyFoldersBreadcrumbs: [...action.payload],
			}

		case types.docsAddAndRemoveTag:
			return {
				...state,
				tagsSelected: action.payload,
			}

		case types.docsLoadingModalFolder:
			return {
				...state,
				loadingFolderModal: !state.loadingFolderModal,
			}

		default:
			return state;
	}
}