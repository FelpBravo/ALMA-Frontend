import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableBodyCell } from './TableBodyCell';

import IntlMessages from 'util/IntlMessages';

export const DataTableFolders = ({ folders, privileges }) => {
	let listRol = [];
	privileges.map((rol) => {
		switch (rol) {
			case 'ROLE_FOLDER_UPDATE':
				listRol.push(rol)
				break;
			case 'ROLE_FOLDER_DELETE':
				listRol.push(rol)
				break;
			case 'ROLE_FOLDER_CREATE':
				listRol.push(rol)
				break;
		}
	});
	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">

				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, width: "60%" }} >
									<IntlMessages id="folders.table.column1" />
								</TableCell>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="folders.table.column5" />
								</TableCell>
								<TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'center' }} >
									<IntlMessages id="folders.table.column2" />
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{


								folders.map((folder) => (
									<TableBodyCell
										privileges={listRol}
										key={folder.id}
										{...folder}
									/>
								))
							}
							{folders.length === 0 &&

								<TableRow hover>
									<TableCell
										style={{ fontFamily: "Poppins", fontSize: '13px', fontWeight: 400, height: 50 }}
										component="th"
										scope="row"
										className="folders-table-row"
									>

										No se encontro ningun directorio 
									</TableCell>
								</TableRow>
							}
						</TableBody>
					</Table>
				</TableContainer>

			</div>
		</div>
	)
}
