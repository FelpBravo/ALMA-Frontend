import React from 'react'
import IntlMessages from 'util/IntlMessages'
import OrderTable from './ui/OrderTable'

export const RecentsActivities = () => {
	return (
		<div className="jr-card">
			<div className="jr-card-header d-flex align-items-center">
				<h3 className="mb-0">
					<IntlMessages id="dashboard.titleRecentActivities" />
				</h3>
				<div className="ml-auto">
					<span className="text-white badge badge-success"></span>
				</div>
			</div>
			<OrderTable />
		</div>
	)
}
