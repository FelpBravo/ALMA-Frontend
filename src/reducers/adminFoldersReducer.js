import { types } from 'types/types';

const initialState = {
	folders: [],
	historyFolders: [],
	currentFolders: {
		id: -1,
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

		default:
			return state;
	}
};

const setFolders = (folderId, folders, currentFolder) => {

	if (currentFolder.id == folderId) {

		currentFolder.children = [...folders];
		currentFolder.hashSubFolders = true;

	} else if (Array.isArray(currentFolder.children)) {

		for (const folder of currentFolder.children) {

			setFolders(folderId, folders, folder);

		}
	}

}