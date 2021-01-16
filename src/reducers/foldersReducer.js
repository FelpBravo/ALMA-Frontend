import { setChildren } from 'helpers/setChildren';
import { types } from 'types/types';

const initialState = {
	selectedIds: [],
	folderId: '',
	initFolders: [],
};

export const foldersReducer = (state = initialState, action) => {

	switch (action.type) {

		case types.foldersInitLoaded:
			return {
				...state,
				initFolders: [...action.payload],
			}

		case types.foldersSetChildren:
			setChildren(state.initFolders, action.payload.id, action.payload.folders);
			return {
				...state,
				initFolders: [...state.initFolders],
			}

		case types.foldersSaveIds:
			return {
				...state,
				selectedIds: [...state.selectedIds, action.payload],
			}

		case types.foldersRemoveId:
			return {
				...state,
				selectedIds: state.selectedIds.map(x => {
					if (x != action.payload) {
						return x;
					}
				}),
			}

		case types.foldersSelected:
			return {
				...state,
				folderId: action.payload,
			}

		case types.foldersRemoveAll:
			return {
				...state,
				selectedIds: [],
				folderId: '',
				initFolders: [],
			}

		default:
			return state;
	}

};


