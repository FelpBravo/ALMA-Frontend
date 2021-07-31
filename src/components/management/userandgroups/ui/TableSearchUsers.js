import React from 'react';
import IntlMessages from 'util/IntlMessages';
import { useSelector } from 'react-redux'
import { DataTableUsers } from './DataTableUsers';


export const TableSearchUsers = () => {

		return (
			<div className="row">
				<div className="col-xl-12 col-lg-12 col-md-12 col-12">
					<div className="jr-card">
	
						<div className="jr-card-header d-flex align-items-center">
							<div>
							<h3 className="mb-0">
								<IntlMessages id="users.result" />
							</h3>
							<span className="user-description mt-2 mr-2">{<IntlMessages id="users.view.total" />}</span>	
							</div>
							<div style={{color: '#FFA800'}} className="row ml-auto">		
							</div>
						</div>
					
					<DataTableUsers/>
			
					</div>
				</div>
			</div>
		)
	
}
