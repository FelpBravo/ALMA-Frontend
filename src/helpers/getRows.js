
export const getRows = (fields = [], columns) => {

	let rows = Math.floor(fields.length / columns);
	const resto = fields.length % columns;
	if (resto !== 0) {
		rows++;
	}

	return rows;

};