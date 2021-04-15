import React from 'react';
import IntlMessages from 'util/IntlMessages';
import DataTable from './DataTable';
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';
import { useSelector } from 'react-redux';

export const TableSearch = () => {

	const { documents = {}, fields = [], textSearch = '' } = useSelector(state => state.searchs);
	const { data = [], totalItems = 0 } = documents;

	
	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">

					<div className="jr-card-header d-flex align-items-center">
						<div>
						<h3 className="mb-0">
							<IntlMessages id="dashboard.searchResults" />
						</h3>
						<span className="user-description mt-2 mr-2">Total documentos encontrados {totalItems}</span>
						</div>
						<div style={{color: '#FFA800'}} className="row ml-auto">
						   { /* <StarOutlineOutlinedIcon className="mt-3 mr-2"/>
                             <p className="mr-5 mt-3">Guardar búsqueda</p>*/}
							
						</div>
					</div>

					<DataTable />

				</div>
			</div>
		</div>
	)
}
