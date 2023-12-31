import React from "react";
import { isIOS, isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import Footer from "components/ui/components/Footer";
import Tour from "components/ui/components/Tour";
import SideBar from "components/ui/SideBar";
import { COLLAPSED_DRAWER, FIXED_DRAWER } from "constants/ActionTypes";
import Swal from 'sweetalert2';

import Header from "./Header/index";

const Vertical = (props) => {

	const { drawerType } = useSelector(({ settings }) => settings);
	const drawerStyle = drawerType.includes(FIXED_DRAWER) ? "fixed-drawer" : drawerType.includes(COLLAPSED_DRAWER) ? "collapsible-drawer" : "mini-drawer";

	//set default height and overflow for iOS mobile Safari 10+ support.
	if (isIOS && isMobile) {
		document.body.classList.add("ios-mobile-view-height");
	} else if (document.body.classList.contains("ios-mobile-view-height")) {
		document.body.classList.remove("ios-mobile-view-height");
	}

	const onCloseSwal = () => {
		const isVisible = Swal.isVisible();
		if (isVisible){
			Swal.close();
		}
	}

	return (
		<div className={`app-container ${drawerStyle}`}>
			{/* <Tour /> */}

			<SideBar onClick={onCloseSwal}  />

			<div className="app-main-container">
				<div onClick={onCloseSwal} className="app-header">
					<Header />
				</div>

				<main className="app-main-content-wrapper">
					<div className="app-main-content">
						{props.children}
					</div>
					<Footer />
				</main>
			</div>

			{/*<ColorOption />*/}
		</div>
	);
};

export default withRouter(Vertical);
