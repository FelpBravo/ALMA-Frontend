import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IntlMessages from 'util/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';
import TableActionButton from 'components/search/ui/TableActionButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ModalAddUsersGroup from './ModalAddUsersGroup';
import { openModalUsersGroup, removeUserGroupLoading } from 'actions/adminUsersAndGroup';
import { hasAuthority } from 'util/authorities';


const useStyles = makeStyles((theme) => ({

	iconos: {
		cursor: "pointer",
		color: "#2196f3",
		fontSize: '18px',
	},
	iconsHolder: {
		display: "flex",
		justifyContent: "flex-end",
	},
}));


const DataTableUserFromGroup = ({ setOpenUserFromGroup }) => {

	const classes = useStyles();

	const isMounted = useRef(true)

	const dispatch = useDispatch()

	const { authUser } = useSelector(state => state.auth)

	const { members, idGroup, nameGroup } = useSelector(state => state.adminUsers)

	const canUpdateGroups = useSelector(hasAuthority('ROLE_GROUPS_UPDATE'));

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	const handleAdd = () => {
		dispatch(openModalUsersGroup());
	}

	const handleRemove = async (id) => {
		
		const resp = await Swal.fire({
			title: 'Eliminar',
			text: "¿Estas seguro que quiere eliminar al usuario de este grupo?",
			icon: "question",
			showCancelButton: true,
			focusConfirm: true,
			heightAuto: false,
		});
		
		if (resp.value) {
			dispatch(removeUserGroupLoading(authUser, idGroup, id));
			
		}

	}
	const users = members.users
	
	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">

				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									{<IntlMessages id="document.add.userGroup" />} {idGroup}
								</TableCell>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >

								</TableCell>
								{
									canUpdateGroups &&
									<TableCell
										onClick={() => handleAdd()}
										style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'end', cursor: 'pointer' }} >
										<AddIcon />
										<IntlMessages id="document.add.user" />
									</TableCell>
								}
							</TableRow>
						</TableHead>
						<TableBody>


							{users && users.length > 0 && users.map(({ id, firstName, lastName, email }, index) => {
								return (
									<TableRow key={index} >
										<TableCell>
											<AccountCircleOutlinedIcon className="mr-1" fontSize="small" />
											{id}
										</TableCell>
										<TableCell>{email}</TableCell>
										<TableCell>
											<div className={classes.iconsHolder}>
												<TableActionButton
													materialIcon={
														<DeleteOutlinedIcon
															className={classes.iconos}
															onClick={() => handleRemove(id)}
														/>
													}
												/>
											</div>
										</TableCell>
									</TableRow>
								)
							})

							}
							{users && users.length === 0 &&
								<TableRow key='1' >
									<TableCell>
										<IntlMessages id="document.not.user" />
									</TableCell>
								</TableRow>
							}

						</TableBody>
					</Table>
				</TableContainer>
				<ModalAddUsersGroup />
			</div>

		</div>
	)
}

export { DataTableUserFromGroup }