import React, { useEffect, useRef, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IntlMessages from 'util/IntlMessages';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import TableActionButton from 'components/search/ui/TableActionButton';
import { makeStyles } from '@material-ui/core/styles';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import { startFlowsAllInit } from 'actions/flowDocument';
import { useDispatch, useSelector } from 'react-redux';


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
									<IntlMessages id="Nombre del documento" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="Tipo de flujo" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="Fecha de creación" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="Estado" />
								</TableCell>
								<TableCell align="center" className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'center' }} >
									<IntlMessages id="Seguimiento" />
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody >
						{data.map(({ fileName, role, status, createdOn, author, instanceId, taskName }, index) => {

                                return <TableRow key={index} >
							 
									<TableCell style={{fontFamily:"Poppins", fontSize:"13px"}}>
								    {fileName}
									</TableCell>                                  
									<TableCell style={{fontFamily:"Poppins", textAlign:"center", fontSize:"13px"}}>									
									{taskName}
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