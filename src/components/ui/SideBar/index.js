import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';

import { COLLAPSED_DRAWER, FIXED_DRAWER, HORIZONTAL_NAVIGATION } from 'constants/ActionTypes';
import { toggleCollapsedNav, updateWindowWidth } from 'actions/setting';

import SideBarContent from "./SideBarContent";

const SideBar = () => {
	const dispatch = useDispatch();
	const { drawerType, width, navigationStyle } = useSelector(({ settings }) => settings);
	const { navCollapsed } = useSelector(({ common }) => common);
	const [ activo, setActivo ] = useState(false)
	const [ fullWidth, setFullWith] = useState(false)
	const [ respWidth, setRespWith] = useState(false)

	
/* 
	 useEffect(() => {
		 console.log(width);
	if(!activo){
		setActivo(true)
		window.addEventListener('resize', () => {
			dispatch(updateWindowWidth(window.innerWidth))
		}); 
	}
	 if(width > 1200)
	 {
		setFullWith(true)
		window.addEventListener('resize', () => {
			dispatch(updateWindowWidth(window.innerWidth))
		}); 

	 }
	 	
	}, [dispatch]); */

	const onToggleCollapsedNav = (e) => {
		dispatch(toggleCollapsedNav());
	};

	let drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'd-xl-flex' : drawerType.includes(COLLAPSED_DRAWER) ? '' : 'd-flex';
	let type = 'permanent';
	if (drawerType.includes(COLLAPSED_DRAWER) || (drawerType.includes(FIXED_DRAWER) && width < 1200)) {
		type = 'temporary';
	}

	if (navigationStyle === HORIZONTAL_NAVIGATION) {
		drawerStyle = '';
		type = 'temporary';
	}

	return (
		<div className={`app-sidebar d-none ${drawerStyle}`}>

			<Drawer className="app-sidebar-content"
				variant={type}
				open={type.includes('temporary') ? navCollapsed : true}
				onClose={onToggleCollapsedNav}
				classes={{
					paper: 'side-nav',
				}}
			>

				<div
					className="user-profile d-flex flex-row align-items-center" 
				>

					<Link
						className="app-logo mr-2 d-none d-sm-block"
						to="/"
					>
						<img src={require("assets/images/logo-banner.png")} alt="Jambo" title="Jambo" />
					</Link>

				</div>

				<SideBarContent />

			</Drawer>

		</div>
	);
};


export default withRouter(SideBar);

