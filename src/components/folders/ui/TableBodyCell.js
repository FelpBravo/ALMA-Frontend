import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableCell, TableRow } from '@material-ui/core';

import {
	openModalFolder, setActionModal, setFolder, startDeleteFolderLoading, startSubFoldersLoading
} from 'actions/adminFolders';
import { ACTION_CREATE, ACTION_EDIT } from 'constants/constUtil';
import Swal from 'sweetalert2';

export const TableBodyCell = ({ id, name, hashSubFolders, state, parentId, position, privileges }) => {

	const dispatch = useDispatch();

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
					title: 'Folders',
					text: "¿Está seguro de continuar?",
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
				style={{ fontFamily: "Poppins", fontSize: '14px', fontWeight: 400 }}
				onClick={handleOnClick}
				component="th"
				scope="row"
				className="folders-table-row"
			>
				{name}
			</TableCell>
			<TableCell
				style={{ fontFamily: "Poppins", fontSize: '14px', fontWeight: 400 }}
				className="folders-table-row"
				onClick={handleOnClick}
			>
				{position}
			</TableCell>
			<TableCell
				style={{ fontFamily: "Poppins", fontSize: '14px', fontWeight: 400 }}
				className="folders-table-row"
				onClick={handleOnClick}
			>
				{
					state ? 'Activo' : 'Inactivo'
				}
			</TableCell>
			<TableCell>
				<div className="custom-td-table">
					{privileges.map((rol) => {
						if ('ROLE_FOLDER_CREATE' === rol) {
							return <i
								title="New"
								onClick={() => handleSelectAction(1)}
								className="fa fa-plus cursor-pointer custom-link-dash"
							/>
						}
						else if ('ROLE_FOLDER_UPDATE' === rol) {
							return <i
								title="Edit"
								onClick={() => handleSelectAction(2)}
								className="far fa-edit cursor-pointer custom-link-dash"
							/>
						}
						else if ('ROLE_FOLDER_DELETE' === rol) {
							return <i
								title="Delete"
								onClick={() => handleSelectAction(3)}
								className="far fa-trash-alt cursor-pointer custom-link-dash"
							/>
						}
					})}


				</div>
			</TableCell>
		</TableRow>
	)
}
