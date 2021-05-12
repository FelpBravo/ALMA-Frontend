import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';

import {
	openModalFolder, setActionModal, setFolder, startDeleteFolderLoading, startSubFoldersLoading
} from 'actions/adminFolders';
import { ACTION_CREATE, ACTION_EDIT } from 'constants/constUtil';
import Swal from 'sweetalert2';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import TableActionButton from 'components/search/ui/TableActionButton';
import FolderSharedOutlinedIcon from '@material-ui/icons/FolderSharedOutlined';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { startFoldersInitLoading } from 'actions/folders'

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

export const TableBodyCell = ({ id, name, hashSubFolders, state, parentId, position, privileges, type }) => {
	const dispatch = useDispatch();
	
	const classes = useStyles();

	const { authUser } = useSelector(state => state.auth);

	const handleOnClick = () => {
		
			dispatch(startSubFoldersLoading(authUser, id, name));
	
	}
    
	const handleSelectAction = async (number) => {

		switch (number) {
			case 2:

				dispatch(openModalFolder());
				dispatch(setActionModal(ACTION_EDIT));
				dispatch(setFolder({
					id,
					name,
					parentId,
					position,
					state,
					type,
					icon: '',
				}));
				dispatch(startFoldersInitLoading(authUser));
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
					dispatch(startDeleteFolderLoading(authUser, id,parentId));
					setTimeout(()=>{
						dispatch(startFoldersInitLoading(authUser));
					},300)
				}
				break;

			default:
				break;
		}

	}

	return (
		<TableRow hover >
			<TableCell
				style={{ fontFamily: "Poppins", fontSize: '13px', fontWeight: 400, height:50 }}
				onClick={handleOnClick}
				component="th"
				scope="row"
				className="folders-table-row"
			>
			{type.name === 'workspace' &&
			<SupervisedUserCircleIcon  fontSize="small"/>
			} 
			{type.name === 'forum' &&
			<FolderSharedOutlinedIcon  fontSize="small"/>
			}
			{type.name === 'folder' &&
			<FolderOutlinedIcon fontSize="small"/>
			}
			{''} {''} {name}
			</TableCell>
			<TableCell
			style={{ fontFamily: "Poppins", fontSize: '13px', fontWeight: 400 }}
			>
				{type.name}
			</TableCell>
			<TableCell>
				<div className={classes.iconsHolder}>
					{privileges &&
					
					privileges.map((rol, index) => {
						if ('ROLE_FOLDER_UPDATE' === rol) {
							return <TableActionButton
							key={index}
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
							key={index}
							materialIcon={
							<DeleteOutlinedIcon
								className={classes.iconos}
								onClick={() => handleSelectAction(3)}
							/>
							}
						/>
						}
					})
					
					}


				</div>
			</TableCell>
		</TableRow>
	)
}
