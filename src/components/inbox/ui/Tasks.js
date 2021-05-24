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
import TableActionButton from 'components/search/ui/TableActionButton';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';



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
    formControl: {
        width: "100%",
      },
}));


const Tasks = () => {

	const classes = useStyles();

	const isMounted = useRef(true);

	const history = useHistory();
	


	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	const handleManage = () => {
		console.log("Holaaaa")
		//dispatch(addBreadcrumbs(name, `/document/${id}/version`))
		history.push(`/manage`);

	};

	return (
		<div className="row">          
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <Grid item xs={3}>
              <FormControl size="small" variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Estado</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="profile"
                  //onChange={handleOnChangeName}
                  label="Perfiles"
                >
                 
                <MenuItem value='1'>Owner</MenuItem>
                </Select>
              </FormControl>
            </Grid>

             <Divider className='mt-3 mb-3'/> 

				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="Nombre de documento" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="Rol" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="Autor" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="Plazo de revision" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="Estado" />
								</TableCell>
								<TableCell align="center" className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'center' }} >
									<IntlMessages id="Gestionar" />
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody >

							 <TableRow >
									<TableCell style={{fontFamily:"Poppins", fontSize:"13px"}}>
									Plantilla-contrato
									</TableCell>
									<TableCell style={{fontFamily:"Poppins", textAlign:"center", fontSize:"13px"}}>
									Owner
									</TableCell>
									<TableCell style={{fontFamily:"Poppins", textAlign:"center", fontSize:"13px"}}>
									Nadia Gallardo
									</TableCell>
									<TableCell style={{fontFamily:"Poppins", textAlign:"center", fontSize:"13px"}}>
									30-03-2021
									</TableCell>
                                    <TableCell style={{fontFamily:"Poppins", textAlign:"center", fontSize:"13px"}}>
									En revisión
									</TableCell>
									
									<TableCell style={{fontFamily:"Poppins", textAlign:"center"}}>
									
											<div className={classes.iconsHolder}>
												<TableActionButton
													materialIcon={
														<DescriptionOutlinedIcon
															className={classes.iconos}
															onClick={handleManage}
														/>
													}
												/>
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

export {Tasks}