import React from 'react';
import IntlMessages from 'util/IntlMessages';
import { DataTableVersioning } from './DataTableVersioning';
import { useSelector } from 'react-redux'


export const TableVersioning= () => {

	const { versioning = {} } = useSelector( state => state.searchs)
	const { data = [], totalItems = 0 } = versioning;
	if(data.length > 0){
		return (
			
				<div >
						<div className="jr-card-header d-flex align-items-center">
						<p className="user-description mt-2 mr-2"></p>
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
