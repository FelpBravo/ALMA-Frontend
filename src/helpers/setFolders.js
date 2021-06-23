
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

export const updatePropertiesAfterEdit = (folderId, name, state, position, currentFolder, groups, inheritPermissions) => {

	if (currentFolder.id == folderId) {

		currentFolder.name = name;
		currentFolder.state = state;
		currentFolder.position = position;
		currentFolder.groups = groups;
		currentFolder.inheritPermissions = inheritPermissions;


	} else if (Array.isArray(currentFolder.children)) {

		for (const folder of currentFolder.children) {

			updatePropertiesAfterEdit(folderId, name, state, position, folder, groups, inheritPermissions);

		}
	}

}