import { setFolders, updatePropertiesAfterEdit } from 'helpers/setFolders';
import { types } from 'types/types';

const initialState = {
	folders: [],
	historyFolders: [],
	currentFolders: {
		id: -1,
		name: '',
		folders: [],
	},
	openModal: false,
	actionModal: '',
	folder: {
		id: 0,
		name: '',
		parentId: 0,
		parentName: '',
		position: 0,
		state: true,
	}
};

export const adminFoldersReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.adminFoldersLoaded:
			return {
				...state,
				folders: action.payload,
			}

		case types.adminFoldersSaveCurrentFolders:
			return {
				...state,
				currentFolders: {
					id: action.payload.folderId,
					name: action.payload.name,
					folders: [...action.payload.folders],
				},
			}

		case types.adminFoldersSaveHistory:
			return {
				...state,
				historyFolders: [
					...state.historyFolders,
					{ id: action.payload.folderId, name: action.payload.name }
				]
			}

		case types.adminFoldersSubFoldersLoaded:
			return {
				...state,
				folders: state.folders.map((folder => {

					const { folderId, folders } = action.payload;

					setFolders(folderId, folders, folder);

					return folder;

				})),
			}

		case types.adminFoldersUpdateListHistory:
			return {
				...state,
				historyFolders: [...action.payload,]
			}

		case types.adminFoldersOpenModal:
			return {
				...state,
				openModal: true,
			}

		case types.adminFoldersCloseModal:
			return {
				...state,
				openModal: false,
			}

		case types.adminFoldersSetActionModal:
			return {
				...state,
				actionModal: action.payload,
			}

		case types.adminFoldersRemoveActionModal:
			return {
				...state,
				actionModal: '',
			}

		case types.adminFoldersSetFolder:
			return {
				...state,
				folder: { ...action.payload }
			}

		case types.adminFoldersSaveLoaded:
			return {
				...state,
				folder: {
					id: 0,
					name: '',
					parentId: 0,
					parentName: '',
					position: 0,
					state: true,
				}
			}

		case types.adminFoldersUpdateLoaded:
			return {
				...state,
				currentFolders: {
					...state.currentFolders,
					name: action.payload.name,
				},
				folders: state.folders.map((folder => {

					const { id, name, state, position } = action.payload;

					updatePropertiesAfterEdit(id, name, state, position, folder);

					return folder;

				})),
			}

		case types.adminFoldersRemoveAll:
			return {
				...state,
				folders: [],
				historyFolders: [],
				currentFolders: {
					id: -1,
					name: '',
					folders: [],
				},
				openModal: false,
				actionModal: '',
				folder: {
					id: 0,
					name: '',
					parentId: 0,
					parentName: '',
					position: 0,
					state: true,
				}
			}

		default:
			return state;
	}
};