import { setFolders } from 'helpers/setFolders';
import { types } from 'types/types';

const initialStructure = {
	documentsType: [],
	detailDocumentType: {
		aspectList: [],
	},
	fileIdLoaded: '',
	folderId: '',
	folderIdOrigin:'',
	signatures:[],
	path: '',
	name:'',
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
				{ ...initialStructure,  ...action.payload }
            ]

		default:
			return state;
	}
}