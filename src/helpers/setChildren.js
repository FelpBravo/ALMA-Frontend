
const setChildren = (mainFolders, folderId, folders) => {

	const exists = mainFolders.find(folder => folder.id == folderId);

	if (exists) {
		exists.children = folders;
	} else {
		for (const folder of mainFolders) {
			if (folder.children) {
				setChildren(folder.children, folderId, folders);
			}
		}
	}

};

export {
	setChildren,
}