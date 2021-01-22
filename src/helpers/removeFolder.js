
export const removeFolder = (folderId, folders = []) => {

	folders = folders.filter(folder => {

		if (folder.id !== folderId) {

			if (Array.isArray(folder.children)) {
				folder.children = removeFolder(folderId, folder.children);
			}

			return folder;
		}

	});

	return folders;
}