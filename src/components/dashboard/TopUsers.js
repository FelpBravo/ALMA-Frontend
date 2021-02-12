import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import { Avatar } from '@material-ui/core';



export const TopUsers = () => {
	const { audits } = useSelector(state => state.audit);
	const userImageList = audits.top_users

	const View_Avatar = () => {
		if (userImageList && userImageList.length > 0) {
			return (<ul className="list-inline mb-0">
				{userImageList.map((user, index) =>
					<li className="list-inline-item mr-0" key={index}>
						<Avatar className="size-50" src='https://via.placeholder.com/150x150' />
						<p className="custom-top-users">{user.userFullName}</p>
					</li>
				)}
			</ul>)
		}
		else {
			return (<></>)
		}
	}



	return (
		<div className="jr-card">

			<div className="jr-card-header d-flex align-items-center">
				<h3 className="mb-0">
					<IntlMessages id="dashboard.titleTopUsers" />
				</h3>
				<div className="ml-auto">
					<span className="custom-link-dash">
						<IntlMessages id="dashboard.moreInfo" /> <i className="fas fa-arrow-right"></i>
					</span>
				</div>
			</div>

			<div className="jr-customers">
					<View_Avatar/>
			</div>

		</div>
	)
}

