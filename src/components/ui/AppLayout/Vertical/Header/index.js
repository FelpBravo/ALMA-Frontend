import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";

import { switchLanguage, toggleCollapsedNav } from "actions/setting";
import CardHeader from "components/ui/components/dashboard/Common/CardHeader";
import LanguageSwitcher from "components/ui/components/LanguageSwitcher";
import UserInfo from "components/ui/components/UserInfo";
import { COLLAPSED_DRAWER, FIXED_DRAWER } from "constants/ActionTypes";
import IntlMessages from "util/IntlMessages";

import AppNotification from "../../../components/AppNotification";

const Index = (props) => {

	const dispatch = useDispatch();
	const { navCollapsed } = useSelector(({ common }) => common);
	const { drawerType, locale } = useSelector(({ settings }) => settings);
	const [langSwitcher, setLangSwitcher] = useState(false);
	const [appNotification, setAppNotification] = useState(false);
	const { data } = useSelector(state => state.notifications);

	const hasNotifications = Boolean(data?.find(({ viewed }) => viewed === false))

	const onAppNotificationSelect = () => {
		setAppNotification(!appNotification);
	};

	const onLangSwitcherSelect = (event) => {
		setLangSwitcher(!langSwitcher);
	};

	const handleRequestClose = () => {
		setLangSwitcher(false);
	};

	const onToggleCollapsedNav = (e) => {
		const val = !navCollapsed;
		dispatch(toggleCollapsedNav(val));
	};

	const onSwitchLanguage = (lang) => {
		dispatch(switchLanguage(lang))
	};

	const drawerStyle = drawerType.includes(FIXED_DRAWER) ? "d-block d-xl-none" : drawerType.includes(COLLAPSED_DRAWER) ? "d-block" : "d-none";

	return (
		<AppBar className="app-main-header">

			<Toolbar className="app-toolbar" disableGutters={false}>

				<IconButton className={`jr-menu-icon mr-3 ${drawerStyle}`} aria-label="Menu"
					onClick={onToggleCollapsedNav}>
					<span className="menu-icon" />
				</IconButton>

				<ul className="header-notifications list-inline ml-auto">
					<li className="list-inline-item">

						<Dropdown
							className="quick-menu"
							isOpen={langSwitcher}
							toggle={onLangSwitcherSelect}>

							<DropdownToggle
								className="d-inline-block"
								tag="span"
								data-toggle="dropdown">
								<IconButton className="icon-btn">
									<i className={`flag flag-24 flag-${locale.icon}`} />
								</IconButton>
							</DropdownToggle>

							<DropdownMenu right className="w-50">
								<LanguageSwitcher switchLanguage={onSwitchLanguage}
									handleRequestClose={handleRequestClose} />
							</DropdownMenu>
						</Dropdown>

					</li>

					<li className="list-inline-item app-tour">
						<Dropdown
							className="quick-menu"
							isOpen={appNotification}
							toggle={onAppNotificationSelect}>

							<DropdownToggle
								className="d-inline-block"
								tag="span"
								data-toggle="dropdown">
								<IconButton className="icon-btn">
									<i className={`zmdi zmdi-notifications-none ${hasNotifications && 'icon-alert animated infinite wobble'}`} />
								</IconButton>
							</DropdownToggle>

							<DropdownMenu right>
								<CardHeader styleName="align-items-center"
									heading={<IntlMessages id="appNotification.title" />} />
								<AppNotification isOpen={appNotification} />
							</DropdownMenu>
						</Dropdown>
					</li>


					<li className="list-inline-item">

						<UserInfo />

					</li>
				</ul>
				<div className="ellipse-shape" />
			</Toolbar>
		</AppBar >
	);
};


export default withRouter(Index);
