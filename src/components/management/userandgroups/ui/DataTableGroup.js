import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Swal from 'sweetalert2';

import { deleteGroupLoading, groupSearchLoading, membersGroupInitLoading, startGroupInitLoading } from 'actions/adminUsersAndGroup';
import TableActionButton from 'components/search/ui/TableActionButton';
import { hasAuthority } from 'util/authorities';
import IntlMessages from 'util/IntlMessages';

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


const DataTableGroup = ({ setOpenUserFromGroup }) => {

	const classes = useStyles();

	const isMounted = useRef(true)

	const dispatch = useDispatch()

	const { authUser } = useSelector(state => state.auth)

	const { grouplist = {}, } = useSelector(state => state.adminUsers);

	const useQuery = () => new URLSearchParams(useLocation().search);

	let query = useQuery();

	const searchGroup = query.get("searchGroup")
	const canDeleteGroups = useSelector(hasAuthority('ROLE_GROUPS_DELETE'));

	useEffect(() => {
		if (searchGroup) {
			dispatch(groupSearchLoading(authUser, searchGroup))
		}
		else {
			dispatch(startGroupInitLoading(authUser));
		}

	}, [dispatch, authUser]);

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	const handleSelectName = (id, name) => {
		setOpenUserFromGroup(true)
		dispatch(membersGroupInitLoading(authUser, id, name));

	}

	const handleDelete = async (id) => {
		const resp = await Swal.fire({
			title: 'Eliminar',
			text: "¿Estas seguro que quiere eliminar al usuario de este grupo?",
			icon: "question",
			showCancelButton: true,
			focusConfirm: true,
			heightAuto: false,
		});

		if (resp.value) {
			dispatch(deleteGroupLoading(authUser, id));
		}

	}


	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">

				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="title.groups" />
								</TableCell>
								{
									canDeleteGroups &&
									<TableCell
										className='mr-3'
										style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'end' }} />
								}
							</TableRow>
						</TableHead>
						<TableBody>

							{grouplist.map(({ id, name }, index) => {

								return <TableRow key={index} >
									<TableCell style={{ fontFamily: "Poppins", fontSize: '14px', fontWeight: 400, cursor: 'pointer' }}
										onClick={() => handleSelectName(id, name)}
									>
										{name}
									</TableCell>
									{
										canDeleteGroups &&
										<TableCell>
											<div className={classes.iconsHolder}>
												<TableActionButton
													materialIcon={
														<DeleteOutlinedIcon
															className={classes.iconos}
															onClick={() => handleDelete(id)}
														/>
													}
												/>
											</div>

										</TableCell>
									}

								</TableRow>
							})}
							{grouplist.length === 0 &&
								<TableRow key='1' >
									<TableCell>
										Grupo no existente
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

export { DataTableGroup }