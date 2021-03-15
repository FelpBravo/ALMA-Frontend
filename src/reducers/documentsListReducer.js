import { setFolders } from 'helpers/setFolders';
import { types } from 'types/types';
import update from 'lodash/update';

const initialStructure = {
	documentsType: [],
	detailDocumentType: {
		aspectList: [],
	},
	fileIdLoaded: '',
	folderId: '',
	folderIdOrigin: '',
	signatures: [],
	path: '',
	name: '',
	pathFolderName: '',
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
};

const initialState = []

export const documentsListReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.docsListSaveFileIdLoaded:
			return [
				...state,
				{ ...initialStructure, ...action.payload }
			]

		case types.docsListSaveThumbnailGenerated:
			return [
				...state,
				{ thumbnailGenerated: action.payload }
			]

		case types.docsListSaveThumbnail:
			const { fileId, thumbnail } = action.payload
			const newState = state.map(item => fileId === item.fileIdLoaded ? { ...item, thumbnail } : item)

			return [...newState]

		default:
			return state;
	}
}