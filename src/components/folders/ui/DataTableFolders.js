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

export const DataTableFolders = ({ folders }) => {

	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">

				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '14px', fontWeight: 400  }} >
									<IntlMessages id="folders.table.column1" />
								</TableCell>
								<TableCell style={{ background: '#369bff', color: '#ffffff',fontFamily: "Poppins", fontSize: '14px', fontWeight: 400 }} >
									<IntlMessages id="folders.table.column4" />
								</TableCell>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '14px', fontWeight: 400 }} >
									<IntlMessages id="folders.table.column3" />
								</TableCell>
								<TableCell className="text-right" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '14px', fontWeight: 400 }} >
									<IntlMessages id="folders.table.column2" />
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								folders.map((folder) => (
									<TableBodyCell
										key={folder.id}
										{...folder}
									/>
								))
							}
						</TableBody>
					</Table>
				</TableContainer>

			</div>
		</div>
	)
}
