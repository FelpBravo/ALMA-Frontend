import React from 'react';
import IntlMessages from 'util/IntlMessages';
import { DataTableReports } from './DataTableReports';
import { useSelector } from 'react-redux'


export const TableSearchMissing = () => {

	const { missing = {} } = useSelector( state => state.reports)
	const { data = [], totalItems = 0 } = missing;
	if(data.length > 0){
		return (
			<div className="row">
				<div className="col-xl-12 col-lg-12 col-md-12 col-12">
					<div className="jr-card">
	
						<div className="jr-card-header d-flex align-items-center">
							<div>
							<h3 className="mb-0">
								<IntlMessages id="dashboard.searchResults" />
							</h3>
							<p className="user-description mt-2 mr-2">Total documentos encontrados {totalItems}</p>
							</div>
							<div style={{color: '#FFA800'}} className="row ml-auto">		
							</div>
						</div>
					
					<DataTableReports/>
			
					</div>
				</div>
			</div>
		)
	}
	else
	{
		return <></>
	}
	
}