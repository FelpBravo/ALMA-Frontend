export const removeTags = (tagId, tagsData = []) => {

	tagsData = tagsData.filter(tag => {

		if (tag.id !== tagId) {

			if (Array.isArray(tag)) {
				tag = removeTags(tagId, tag);
			}

			return tag;
		}

	});

	return tagsData;
}