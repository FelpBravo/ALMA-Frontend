import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';

import {
	openModalFolder, setActionModal, setFolder, startDeleteFolderLoading, startSubFoldersLoading
} from 'actions/adminFolders';
import { ACTION_CREATE, ACTION_EDIT } from 'constants/constUtil';
import Swal from 'sweetalert2';
import AddIcon from '@material-ui/icons/Add';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import TableActionButton from 'components/search/ui/TableActionButton';

const useStyles = makeStyles((theme) => ({
	iconos: {
	  cursor: "pointer",
	  color: "#2196f3",
	  fontSize: '18px',
	},
	iconsHolder: {
		display: "flex",
		justifyContent: "center",
	  },
	
  }));

export const TableBodyCell = ({ id, name, hashSubFolders, state, parentId, position, privileges }) => {

	const dispatch = useDispatch();
	
	const classes = useStyles();

	const { authUser } = useSelector(state => state.auth);

	const handleOnClick = () => {
		if (hashSubFolders) {
			dispatch(startSubFoldersLoading(authUser, id, name));
		}
	}

	const handleSelectAction = async (type) => {

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

				const resp = await Swal.fire({
					title: 'Eliminar',
					text: "¿Está seguro que quiere eliminar la carpeta?",
					icon: "question",
					showCancelButton: true,
					focusConfirm: true,
					heightAuto: false,
				});

				if (resp.value) {
					dispatch(startDeleteFolderLoading(authUser, id));
				}

				break;

			default:
				break;
		}

	}

	return (
		<TableRow hover>
			<TableCell
				style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}
				onClick={handleOnClick}
				component="th"
				scope="row"
				className="folders-table-row"
			>
				{name}
			</TableCell>
			<TableCell
				style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}
				className="folders-table-row"
				onClick={handleOnClick}
			>
				{position}
			</TableCell>
			<TableCell
				style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}
				className="folders-table-row"
				onClick={handleOnClick}
			>
				{
					state ? 'Activo' : 'Inactivo'
				}
			</TableCell>
			<TableCell>
				<div className={classes.iconsHolder}>
					{privileges.map((rol) => {
						if ('ROLE_FOLDER_CREATE' === rol) {
							return <TableActionButton
							materialIcon={
							<AddIcon
								className={classes.iconos}
								onClick={() => handleSelectAction(1)}
							/>
							}
						/>
						}
						else if ('ROLE_FOLDER_UPDATE' === rol) {
							return <TableActionButton
							materialIcon={
							<BorderColorOutlinedIcon
								className={classes.iconos}
								onClick={() => handleSelectAction(2)}
							/>
							}
						/>
						}
						else if ('ROLE_FOLDER_DELETE' === rol) {
							return <TableActionButton
							materialIcon={
							<DeleteOutlinedIcon
								className={classes.iconos}
								onClick={() => handleSelectAction(3)}
							/>
							}
						/>
						}
					})}


				</div>
			</TableCell>
		</TableRow>
	)
}
