import Drawer from '@material-ui/core/Drawer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { toggleCollapsedNav } from 'actions/setting';
import { COLLAPSED_DRAWER, FIXED_DRAWER } from 'constants/ActionTypes';

import SideBarContent from "./SideBarContent";

const SideBar = ({onClick}) => {
	const dispatch = useDispatch();
	const { drawerType } = useSelector(({ settings }) => settings);
	const { navCollapsed } = useSelector(({ common }) => common);

	const onToggleCollapsedNav = (e) => {
		dispatch(toggleCollapsedNav());
	};

	const getType = width => width < 1200 ? 'temporary' : 'permanent'

	const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'd-xl-flex' : drawerType.includes(COLLAPSED_DRAWER) ? '' : 'd-flex';
	const [type, setType] = useState(getType(window.innerWidth))

	useEffect(() => {
		window.addEventListener('resize', () => {
			const width = window.innerWidth;
			setType(getType(width))
		});
	}, [])

	return (
		<div onClick={onClick} className={`app-sidebar d-none ${drawerStyle}`}>
			<Drawer className="app-sidebar-content"
				variant={type}
				open={type.includes('temporary') ? navCollapsed : true}
				onClose={onToggleCollapsedNav}
				classes={{
					paper: 'side-nav',
				}}
			>
				<div className="user-profile d-flex flex-row align-items-center">
					<Link className="app-logo mr-2 d-none d-sm-block" to="/">
						<img src={require("assets/images/logo-banner.png")} alt="Jambo" title="Jambo" />
					</Link>
				</div>
				<SideBarContent />
			</Drawer>
		</div>
	);
};

export default withRouter(SideBar);

