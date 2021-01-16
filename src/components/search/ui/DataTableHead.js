import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import { TableCell, TableRow } from '@material-ui/core';

export const DataTableHead = ({ columns = [] }) => {
	return (
		<TableHead>
			<TableRow>
				{columns.map(column => {
					return (
						<TableCell
							style={{ background: '#369bff', color: '#ffffff' }}
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