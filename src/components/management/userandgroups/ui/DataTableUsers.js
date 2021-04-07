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
import { makeStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';


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
	const { reports = {}, date = {} } = useSelector(state => state.reports)
	const { data=[], totalItems= 0 } = reports


	const [page, setPage] = useState(0)

	const [state, setState] = React.useState({
		checkedA: true,
		checkedB: true,
	  });
	
	  const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	  };


	useEffect(()=>{
		return ()=>{
			isMounted.current = false
		}
	},[])

	const handleChangePage = (event, page) => {
		dispatch(startReportsLoading(authUser,date.startDate,date.endDate,page));

		setPage(page);

	};

	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">

				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400  }} >
									<IntlMessages id="users.table.column1" />
								</TableCell>
								<TableCell style={{ background: '#369bff', color: '#ffffff',fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="users.table.column2" />
								</TableCell>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="users.table.column3" />
								</TableCell>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400}} >
									<IntlMessages id="users.table.column4" />
								</TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'center' }} >
									<IntlMessages id="users.table.column5" />
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							
							
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell>
										<Switch
											checked={state.checkedB}
											onChange={handleChange}
											color="primary"
											name="checkedB"
											inputProps={{ 'aria-label': 'primary checkbox' }}
										/>
									</TableCell>
									<TableCell>
									<div className={classes.iconsHolder}>			
										<TableActionButton
											materialIcon={
												<BorderColorOutlinedIcon
													className={classes.iconos}
													//onClick={() => handleSelectActionTags(2)}
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
									</TableCell>
									
							
						
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

			</div>
		</div>
	)
}

export { DataTableUsers}