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
import TableActionButton from 'components/search/ui/TableActionButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';



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


const DataTableUserFromGroup = () => {

	const classes = useStyles();

	const isMounted = useRef(true)
	const history = useHistory()
	const dispatch = useDispatch()
	
	const { authUser } = useSelector(state => state.auth)

	

	useEffect(() => {


	}, [dispatch]);


	
	  const handleChange = ({target}) => {
		
	  };


	useEffect(()=>{
		return ()=>{
			isMounted.current = false
		}
	},[])


	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">

				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400  }} >
									<IntlMessages id="Usuarios del grupo" />
								</TableCell>
								<TableCell style={{ background: '#369bff', color: '#ffffff',fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									
								</TableCell>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'end' }} >
								<AddIcon/>
                                Agregar Usuario
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							
						<TableRow >
									<TableCell>
									<AccountCircleOutlinedIcon className="mr-1" fontSize="small" />
									Usuario
									</TableCell>
									<TableCell>Correo electrónico</TableCell>
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
						
						</TableBody>
					</Table>
				</TableContainer>

			</div>
			
		</div>
	)
}

export { DataTableUserFromGroup}