import React from 'react';
import IntlMessages from 'util/IntlMessages';
import DataTable from './DataTable';

export const TableSearch = () => {
	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">

					<div className="jr-card-header d-flex align-items-center">
						<h3 className="mb-0">
							<IntlMessages id="dashboard.searchResults" />
						</h3>
						<div className="ml-auto">
							<span className="custom-link-dash">

							</span>
						</div>
					</div>

					<DataTable />

				</div>
			</div>
		</div>
	)
}
