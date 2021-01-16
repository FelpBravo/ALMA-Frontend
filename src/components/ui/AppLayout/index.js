import React from "react";
import AppLayouts from "./AppLayouts";
import { useSelector } from "react-redux";
import { onGetLayout } from "helpers/onGetLayout";
import LibraryRouter from "routers/LibraryRouter";

const AppLayout = () => {

	const horizontalNavPosition = useSelector(({ settings }) => settings.horizontalNavPosition);
	const navigationStyle = useSelector(({ settings }) => settings.navigationStyle);

	const Layout =
		AppLayouts[navigationStyle === "vertical_navigation"
			? "Vertical"
			: onGetLayout(horizontalNavPosition)];

	return (
		<Layout>
			<LibraryRouter />
		</Layout>
	);
};

export default AppLayout;
