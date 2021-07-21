const setChildrenTags = (mainTags, tagId, tagS) => {

	const exists = mainTags.find(tag => tag.id == tagId);

	if (exists) {
		exists.children = tagS;
	} else {
		for (const tag of mainTags) {
			if (tag.children) {
				setChildrenTags(tag.children, tagId, tagS);
			}
		}
	}

};

export {
	setChildrenTags,
}