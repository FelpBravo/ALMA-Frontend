
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