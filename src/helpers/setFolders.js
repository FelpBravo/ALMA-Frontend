
export const setFolders = (folderId, folders, currentFolder) => {

	if (currentFolder.id == folderId) {

		currentFolder.children = [...folders];
		currentFolder.hashSubFolders = true;

	} else if (Array.isArray(currentFolder.children)) {

		for (const folder of currentFolder.children) {

			setFolders(folderId, folders, folder);

		}
	}

}

export const updatePropertiesAfterEdit = (folderId, name, state, position, currentFolder) => {

	if (currentFolder.id == folderId) {

		currentFolder.name = name;
		currentFolder.state = state;
		currentFolder.position = position;

	} else if (Array.isArray(currentFolder.children)) {

		for (const folder of currentFolder.children) {

			updatePropertiesAfterEdit(folderId, name, state, position, folder);

		}
	}

}