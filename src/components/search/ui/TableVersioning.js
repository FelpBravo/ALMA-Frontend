import React from 'react';
import IntlMessages from 'util/IntlMessages';
import { DataTableVersioning } from './DataTableVersioning';
import { useSelector } from 'react-redux'


export const TableVersioning= () => {

	const { versioning = {} } = useSelector( state => state.searchs)
	const { data = [], totalItems = 0 } = versioning;
	if(data.length > 0){
		return (
			
					<div>
	
						<div className="jr-card-header d-flex align-items-center">
							<div>
							<h3 className="mb-0">
								<IntlMessages id="dashboard.searchResults" />
							</h3>
							<p className="user-description mt-2 mr-2">Total de versiones encontradas {totalItems}</p>
							</div>
							<div style={{color: '#FFA800'}} className="row ml-auto">		
							</div>
						</div>

				     <DataTableVersioning/>
                     
					</div>
		
		)
	}
	else
	{
		return <></>
	}
	
}
