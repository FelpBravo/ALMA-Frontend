import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startFlowsAllInit } from 'actions/flowDocument';
import TableActionButton from 'components/search/ui/TableActionButton';
import IntlMessages from 'util/IntlMessages';

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


const Manage = ({setOpenTracing}) => {

	const classes = useStyles();

	const isMounted = useRef(true)
	const dispatch = useDispatch();
	
	const { authUser } = useSelector(state => state.auth);
	const { flowList ={}} = useSelector(state => state.flowDocument);
	const { data = [], totalItems = 0 } = flowList;
	const [page, setPage] = useState(0)

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

    const handleChangePage = (event, page) => {
		dispatch(startFlowsAllInit(authUser , page ))
		setPage(page);
	
}

	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="versioning.table.column1" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="sidebar.document.FlowType" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="reports.table.missing2" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="users.table.column4" />
								</TableCell>
								<TableCell align="center" className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'center' }} >
									<IntlMessages id="sidebar.document.follow-up" />
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody >
							{data.map(({ fileName, role, status, createdOn, author, instanceId, flowName }, index) => {

                                return <TableRow key={index} >
							 
									<TableCell style={{fontFamily:"Poppins", fontSize:"13px"}}>
								    {fileName}
									</TableCell>                                  
									<TableCell style={{fontFamily:"Poppins", textAlign:"center", fontSize:"13px"}}>									
									{flowName}
									</TableCell>
									<TableCell style={{fontFamily:"Poppins", textAlign:"center", fontSize:"13px"}}>
									{createdOn}
									</TableCell>
									<TableCell style={{fontFamily:"Poppins", textAlign:"center", fontSize:"13px"}}>
									{status}
									</TableCell>								
									
									<TableCell style={{fontFamily:"Poppins", textAlign:"center"}}>
									
											<div className={classes.iconsHolder}>
												<TableActionButton
													materialIcon={
														<PersonPinCircleIcon
															className={classes.iconos}
															onClick={() => setOpenTracing({id: 3})}
													    />
													}
												/>

											</div>

									</TableCell>

								</TableRow>
                            })}
							{/*{!userdata || userdata.length == 0 &&
								<TableRow>
									<TableCell
										style={{ fontFamily: "Poppins", fontSize: '13px', fontWeight: 400, height: 50 }}
										colSpan='5'
									>
										<IntlMessages id="users.nousers" />
									</TableCell>
								</TableRow>

							}*/}

						</TableBody>
					</Table>
				</TableContainer>
				<Grid className="mt-3 mb-3 mr-3"
						container
						justify="flex-end"
						alignItems="flex-end"

					>
						<Pagination 
									style={{color: '#369bff'}}
									//defaultPage={parseInt(page_url)}
									count={Math.ceil(totalItems/10)} 
									color="primary" 
									shape="rounded" 
									total={totalItems} 
									onChange={handleChangePage}
						/> 
					</Grid>
			</div>
		</div>
	)
}

export {Manage}