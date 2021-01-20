import React from 'react';
import { useDispatch } from 'react-redux';
import { TableCell, TableRow } from '@material-ui/core';

import { openModalFolder, setActionModal, setFolder, startSubFoldersLoading } from 'actions/adminFolders';
import { ACTION_CREATE, ACTION_EDIT } from 'constants/constUtil';

export const TableBodyCell = ({ id, name, hashSubFolders, state, parentId, position }) => {

	const dispatch = useDispatch();

	const handleOnClick = () => {
		if (hashSubFolders) {
			dispatch(startSubFoldersLoading(id, name));
		}
	}

	const handleSelectAction = (type) => {

		switch (type) {
			case 1:

				dispatch(openModalFolder());
				dispatch(setActionModal(ACTION_CREATE));
				dispatch(setFolder({
					name: '',
					parentId: id,
					parentName: name,
					position: 0,
					state: true,
					icon: '',
				}));

				break;

			case 2:

				dispatch(openModalFolder());
				dispatch(setActionModal(ACTION_EDIT));
				dispatch(setFolder({
					id,
					name,
					parentId,
					position,
					state,
					icon: '',
				}));

				break;

			case 3:

				break;

			default:
				break;
		}

	}

	return (
		<TableRow hover onClick={handleOnClick}>
			<TableCell component="th" scope="row" className="folders-table-row">
				{name}
			</TableCell>
			<TableCell>{position}</TableCell>
			<TableCell>
				{
					state ? 'Activo' : 'Inactivo'
				}
			</TableCell>
			<TableCell>
				<div className="custom-td-table">
					<i
						onClick={() => handleSelectAction(1)}
						className="fa fa-plus cursor-pointer custom-link-dash"
					></i>
					<i
						onClick={() => handleSelectAction(2)}
						className="far fa-edit cursor-pointer custom-link-dash"
					></i>
					<i
						onClick={() => handleSelectAction(3)}
						className="far fa-trash-alt cursor-pointer custom-link-dash"
					></i>

				</div>
			</TableCell>
		</TableRow>
	)
}
