const onGetLayout = (layout) => {
	switch (layout) {
		case "inside_the_header":
			return "InsideHeaderNav";

		case "above_the_header":
			return "AboveHeaderNav";

		case "below_the_header":
			return "BelowHeaderNav";
		default:
			return "Vertical";
	}
};

export {
	onGetLayout
}