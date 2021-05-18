import React, { useEffect, useRef, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { useHistory, useParams,useRouteMatch ,useLocation } from 'react-router-dom';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IntlMessages from 'util/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import TableActionButton from 'components/search/ui/TableActionButton';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from '@material-ui/core/styles';



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


const Manage = () => {

	const classes = useStyles();

	const isMounted = useRef(true)
	


	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])



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
									<IntlMessages id="Estado" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="Autor" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="Plazo de revision" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="Rol" />
								</TableCell>
								
								<TableCell align="center" className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'center' }} >
									<IntlMessages id="users.table.column5" />
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody >

							 <TableRow >
									<TableCell style={{fontFamily:"Poppins", fontSize:"13px"}}>
									Plantilla-contrato
										
									</TableCell>
                                    <TableCell style={{fontFamily:"Poppins", textAlign:"center", fontSize:"13px"}}>En revisión</TableCell>
									<TableCell style={{fontFamily:"Poppins", textAlign:"center", fontSize:"13px"}}>Nadia Gallardo</TableCell>
									
									<TableCell style={{fontFamily:"Poppins", textAlign:"center", fontSize:"13px"}}>
									30-03-2021
									</TableCell>
									<TableCell style={{fontFamily:"Poppins", textAlign:"center", fontSize:"13px"}}>
									Owner
									</TableCell>
				
									
									<TableCell style={{fontFamily:"Poppins", textAlign:"center"}}>
									
											<div className={classes.iconsHolder}>
												<TableActionButton
													materialIcon={
														<BorderColorOutlinedIcon
															className={classes.iconos}
															//onClick={(event) => handleOpenEditUsers(id, firstName, lastName, email, company, department,companyOther, departmentOther, search)}
														/>
													}
												/>

												{/*<TableActionButton
													materialIcon={
														<DeleteOutlinedIcon
															className={classes.iconos}
														//onClick={() => handleSelectActionTags(3)}
														/>
													}
												/>*/}
											</div>

									</TableCell>

								</TableRow>

							
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
									//count={Math.ceil(totalItems/10)} 
									color="primary" 
									shape="rounded" 
									//total={totalItems} 
									//onChange={handleChangePage}
						/> 
					</Grid>
			</div>
		</div>
	)
}

export {Manage}