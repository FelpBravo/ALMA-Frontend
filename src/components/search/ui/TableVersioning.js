import React from 'react';
import IntlMessages from 'util/IntlMessages';
import { DataTableVersioning } from './DataTableVersioning';
import { useSelector } from 'react-redux'


export const TableVersioning= () => {

	const { versioning = {} } = useSelector( state => state.searchs)
	const { data = [], totalItems = 0 } = versioning;
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

				     <DataTableVersioning/>
                     
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
