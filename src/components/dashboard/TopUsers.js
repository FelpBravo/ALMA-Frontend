import React from 'react';
import IntlMessages from 'util/IntlMessages';
import { Avatar } from '@material-ui/core';

const userImageList = [
	{
		id: 1,
		image: "https://via.placeholder.com/208x208",
		name: 'Adrián',
	},
	{
		id: 2,
		image: "https://via.placeholder.com/150x150",
		name: 'Mila',
	},
	{
		id: 3,
		image: "https://via.placeholder.com/150x150",
		name: 'Felipe',

	},
	{
		id: 4,
		image: "https://via.placeholder.com/150x150",
		name: 'Daniel',
		rating: '5.0',
		deals: '27 Deals'
	},
];

export const TopUsers = () => {
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
				<ul className="list-inline mb-0">
					{userImageList.map((user, index) =>
						<li className="list-inline-item mr-0" key={index}>
							<Avatar className="size-50" src={user.image} />
							<p className="custom-top-users">{user.name}</p>
						</li>
					)}
				</ul>
			</div>

		</div>
	)
}

