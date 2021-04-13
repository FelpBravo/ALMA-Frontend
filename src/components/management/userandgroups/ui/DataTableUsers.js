import React, { useEffect, useRef, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IntlMessages from 'util/IntlMessages';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { startReportsLoading } from 'actions/reports'
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import TableActionButton from 'components/search/ui/TableActionButton';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { startUsersInitLoading, editUserStatus } from 'actions/adminUsers';
import ModalEditUsers from './ModalEditUsers';


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


const DataTableUsers = () => {

	const classes = useStyles();

	const isMounted = useRef(true)
	const history = useHistory()
	const dispatch = useDispatch()

	const { authUser } = useSelector(state => state.auth)

	const { userslist = {}, } = useSelector(state => state.adminUsers);

	const { data = [], totalItems, currentPage } = userslist

	const [userdata, setUserdata] = useState([])

	const [userEditData, setUserEditData] = useState({})
	const [editActive, setEditActive] = useState(false)

	useEffect(() => {

		dispatch(startUsersInitLoading(authUser));

	}, [dispatch,authUser]);

	useEffect(() => {
		setUserdata(data)
	}, [data])

	const [page, setPage] = useState(0)



	const handleChange = ({ target }) => {
		const { id, checked } = target
		const findUser = userdata.find(user => user.id === id)
		findUser.enabled = checked
		setUserdata([...userdata])
		dispatch(editUserStatus(authUser, id, checked))


	};


	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	const handleChangePage = (event, page) => {

	};

	const handleOpenEditUsers = (id, firstName, lastName, email) => {
		setUserEditData({ id, firstName, lastName, email })
		setEditActive(true)
	}

	const handleCloseEditUsers = () =>{
		setUserEditData({})
		setEditActive(false) 
	}


	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">

				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="users.table.column1" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="users.table.column2" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="users.table.column3" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="users.table.column4" />
								</TableCell>
								<TableCell align="center" className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'center' }} >
									<IntlMessages id="users.table.column5" />
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>

							{userdata.length > 0 && userdata.map(({ id, firstName, lastName, email, enabled, external }, index) => {

								return <TableRow key={index}>
									<TableCell>{id}</TableCell>
									<TableCell align="center">{firstName}{` `}{lastName}</TableCell>
									<TableCell align="center">{email}</TableCell>
									<TableCell align="center">
											<Switch
												checked={enabled}
												onChange={handleChange}
												color="primary"
												id={id}
												disabled={!external}
												inputProps={{ 'aria-label': 'primary checkbox' }}
											/>
										

									</TableCell>
									<TableCell align="center" >
										{external &&
											<div className={classes.iconsHolder}>
												<TableActionButton
													materialIcon={
														<BorderColorOutlinedIcon
															className={classes.iconos}
															onClick={(event) => handleOpenEditUsers(id, firstName, lastName, email)}
														/>
													}
												/>

												<TableActionButton
													materialIcon={
														<DeleteOutlinedIcon
															className={classes.iconos}
														//onClick={() => handleSelectActionTags(3)}
														/>
													}
												/>
											</div>
										}

										{!external &&
											<span style={{fontFamily: "Poppins", fontStyle:'oblique'}}>Active Directory</span>
										}
									</TableCell>

								</TableRow>

							})

							}
							{!userdata || userdata.length == 0 &&
								<TableRow>
									<TableCell
										style={{ fontFamily: "Poppins", fontSize: '13px', fontWeight: 400, height: 50 }}
										colSpan='5'
									>
										<IntlMessages id="users.nousers" />
									</TableCell>
								</TableRow>

							}

						</TableBody>
					</Table>
					<Grid className="mt-3 mb-3 mr-3"
						container
						justify="flex-end"
						alignItems="flex-end"

					>
						<Pagination 
									style={{color: '#369bff'}}
									count={Math.ceil(totalItems/10)} 
									color="primary" 
									shape="rounded" 
									total={totalItems} 
									onChange={handleChangePage}/> 
					</Grid>
				</TableContainer>
				<ModalEditUsers data={userEditData} close={handleCloseEditUsers} open={editActive} />
			</div>
		</div>
	)
}

export { DataTableUsers }