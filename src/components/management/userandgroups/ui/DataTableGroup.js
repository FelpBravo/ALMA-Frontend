import React, { useEffect, useRef, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IntlMessages from 'util/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import TableActionButton from 'components/search/ui/TableActionButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from '@material-ui/core/styles';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import { groupSearchLoading, membersGroupInitLoading, startGroupInitLoading } from 'actions/adminUsersAndGroup';
import { useLocation } from 'react-router';



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


const DataTableGroup = () => {

	const classes = useStyles();

	const isMounted = useRef(true)

	const dispatch = useDispatch()

	const { authUser } = useSelector(state => state.auth)

	const { grouplist = {}, } = useSelector(state => state.adminUsers);

	const useQuery = () => new URLSearchParams(useLocation().search);

	let query = useQuery();

	const searchGroup = query.get("searchGroup")

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

	const handleSelectName = (id) => {
		dispatch(membersGroupInitLoading(authUser, id, grouplist));
	}


	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">

				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="Grupos" />
								</TableCell>
								<TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'end' }} >
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>

							{grouplist.map(({ id, name }, index) => {

								return <TableRow key={index} >
									<TableCell style={{ fontFamily: "Poppins", fontSize: '14px', fontWeight: 400, cursor:'pointer' }}
										onClick={() => handleSelectName(id)}
									>

										{/*<img src={require("assets/images/group.png")}/>*/}
										{name}
									</TableCell>
									<TableCell>
										<div className={classes.iconsHolder}>
											<TableActionButton
												materialIcon={
													<DeleteOutlinedIcon
														className={classes.iconos}
													//onClick={() => handleSelectActionTags(3)}
													/>
												}
											/>
										</div>

									</TableCell>

								</TableRow>
							})}

						</TableBody>
					</Table>
				</TableContainer>

			</div>
		</div>
	)
}

export { DataTableGroup }