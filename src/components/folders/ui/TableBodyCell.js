import React from 'react';
import { useDispatch } from 'react-redux';
import { TableCell, TableRow } from '@material-ui/core';

import { startSubFoldersLoading } from 'actions/adminFolders';

export const TableBodyCell = ({ id, name, hashSubFolders, children }) => {

	const dispatch = useDispatch();

	const handleOnClick = () => {
		if (hashSubFolders) {
			dispatch(startSubFoldersLoading(id, name));
		}
	}

	return (
		<TableRow hover onClick={handleOnClick}>
			<TableCell component="th" scope="row" className="folders-table-row">
				{name}
			</TableCell>
		</TableRow>
	)
}
