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
	const [ langSwitcher, setLangSwitcher ] = useState(false);
	const [appNotification, setAppNotification] = useState(false);

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

				{/*
				<Link className="app-logo mr-2 d-none d-sm-block" to="/">
					<img src={require("assets/images/logo.png")} alt="Jambo" title="Jambo" />
				</Link>
				*/}

				{/*<SearchBox styleName="d-none d-lg-block" placeholder=""
					onChange={updateSearchText}
					value={searchText} />*/}

				<ul className="header-notifications list-inline ml-auto">
					{/*<li className="list-inline-item">
						<Dropdown
							className="quick-menu app-notification"
							isOpen={apps}
							toggle={onAppsSelect}>

							<DropdownToggle
								className="d-inline-block"
								tag="span"
								data-toggle="dropdown">
								<span className="app-notification-menu">
									<i className="zmdi zmdi-apps zmdi-hc-fw zmdi-hc-lg" />
									<span>Apps</span>
								</span>
							</DropdownToggle>

							<DropdownMenu>
								{Apps()}
							</DropdownMenu>
						</Dropdown>
					</li>*/}

					{/*
					<li className="d-inline-block d-lg-none list-inline-item">
						<Dropdown
							className="quick-menu nav-searchbox"
							isOpen={searchBox}
							toggle={onSearchBoxSelect}>

							<DropdownToggle
								className="d-inline-block"
								tag="span"
								data-toggle="dropdown">
								<IconButton className="icon-btn">
									<i className="zmdi zmdi-search zmdi-hc-fw" />
								</IconButton>
							</DropdownToggle>

							<DropdownMenu right className="p-0">
								<SearchBox styleName="search-dropdown" placeholder=""
									onChange={updateSearchText}
									value={searchText} />
							</DropdownMenu>
						</Dropdown>
					</li>
					*/}

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
									<i className="zmdi zmdi-notifications-none icon-alert animated infinite wobble" />
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

					{/*<li className="list-inline-item app-tour">
						<Dropdown
							className="quick-menu"
							isOpen={appNotification}
							toggle={onAppNotificationSelect}>

							<DropdownToggle
								className="d-inline-block"
								tag="span"
								data-toggle="dropdown">
								<IconButton className="icon-btn">
									<i className="zmdi zmdi-notifications-none icon-alert animated infinite wobble" />
								</IconButton>
							</DropdownToggle>

							<DropdownMenu right>
								<CardHeader styleName="align-items-center"
									heading={<IntlMessages id="appNotification.title" />} />
								<AppNotification />
							</DropdownMenu>
						</Dropdown>
					</li>
					<li className="list-inline-item mail-tour">
						<Dropdown
							className="quick-menu"
							isOpen={mailNotification}
							toggle={onMailNotificationSelect}
						>
							<DropdownToggle
								className="d-inline-block"
								tag="span"
								data-toggle="dropdown">

								<IconButton className="icon-btn">
									<i className="zmdi zmdi-comment-alt-text zmdi-hc-fw" />
								</IconButton>
							</DropdownToggle>


							<DropdownMenu right>
								<CardHeader styleName="align-items-center"
									heading={<IntlMessages id="mailNotification.title" />} />
								<MailNotification />
							</DropdownMenu>
						</Dropdown>
					</li>*/}

				</ul>

				<div className="ellipse-shape" />
			</Toolbar>
		</AppBar >
	);
};


export default withRouter(Index);
