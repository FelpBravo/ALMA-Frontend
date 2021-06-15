import React from 'react';
import { List } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import IntlMessages from "../../../../util/IntlMessages";
import { hasAllAuthorities, hasAuthority, hasSomeAuthorities } from 'util/authorities';
import { get, isArray, isEmpty, isString } from 'lodash';
import { useSelector } from 'react-redux';

const NavMenuItem = props => {
	const { name, icon, link, bd, auth, hasAll} = props;
	const has = (list, hasAll) => hasAll ? hasAllAuthorities(list) : hasSomeAuthorities(list)
	const isVisible = useSelector(has(isArray(auth) ? auth : [auth], hasAll))

	if (!isEmpty(auth) && !isVisible) return null

	return (
		<List component="div" className='nav-menu-item'>
			<NavLink className="prepend-icon nav-menu-link" to={link}>
				{!!icon && (
					<i className={'zmdi zmdi-hc-fw  zmdi-' + icon} />
				)}
				<span className="nav-text">
					{
						bd ? name : <IntlMessages id={name} />
					}
				</span>
			</NavLink>
		</List>
	)
};

export default NavMenuItem;