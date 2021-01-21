

export const getCurrentFolderById = (folders = [], folderId, valueSearch = []) => {

	for (const folder of folders) {

		if (folder.id === folderId) {

			valueSearch.push(folder);

		} else if (Array.isArray(folder.children)) {

			getCurrentFolderById(folder.children, folderId, valueSearch);

		}

	}

}