import { types } from 'types/types';

const initialState = {
	folders: [],
	historyFolders: [],
	currentFolders: {
		id: -1,
		folders: [],
	},

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

		default:
			return state;
	}
};

const setFolders = (folderId, folders, currentFolder) => {

	if (currentFolder.id == folderId) {

		currentFolder.children = [...folders];

	} else if (Array.isArray(currentFolder.children)) {

		for (const folder of currentFolder.children) {

			setFolders(folderId, folders, folder);

		}
	}

}