import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import { TableCell, TableRow } from '@material-ui/core';

export const DataTableHead = ({ columns = [] }) => {
	return (
		<TableHead >
			<TableRow>
				{columns.map(column => {
					return (
						<TableCell
							style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign:'justify' }}
							key={column.id}
							align={column.numeric}
							padding="default"
						>
							{column.label}
						</TableCell>
					);
				})}
			</TableRow>
		</TableHead>
	);
};