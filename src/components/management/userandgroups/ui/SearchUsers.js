import React, { useState, useEffect } from 'react';
import { Button, InputBase, Grid, makeStyles, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Link from '@material-ui/core/Link';
import { openModalUsers } from 'actions/adminUsers';
import ModalUsers from './ModalUsers';


const useStyles = makeStyles(theme => ({
	root: {
		background: "#E1F0FF",
		border: "none",
		boxShadow: "none",
		padding: "2px 4px",
		display: "flex",
		alignItems: "center",
		padding: 6,
	},
	input: {
		color: '#3699FF',
		fontSize: '14px',
		radius: '4px',
		fontWeight: 500,
		fontFamily: "Poppins, sans-serif !important ",

		"&::placeholder": {
			fontFamily: "Poppins, sans-serif !important ",
			color: '#3699FF',
			align: 'left',
			fontWeight: 500,
		}
	},
}))

const SearchUsers = () => {
	const classes = useStyles();

	const dispatch = useDispatch();

	const [disabledButton, setDisabledButton] = useState(true);
	const [messageError, setMessageError] = useState('');

    const handleSelectNew = () => {
		dispatch(openModalUsers());
	}

	return (
		<div className="row">
		<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Paper className={classes.root}>
								<SearchIcon color="primary" />
								<InputBase
									className={classes.input}
									//value={searchText}
									name="inputSearch"
									//className="custom-text-field"
									fullWidth
									placeholder="Buscar por nombre de usuario"
									//onChange={handleOnChange}
								/>
							</Paper>
							<span className="text-danger text-error">{messageError}</span>
						</Grid>

						<Grid item xs={2}>
							<Button
								style={{ paddingTop: "10px", paddingBottom: "10px", fontFamily: "Poppins, sans-serif", fontSize: '12px', fontWeight: 600, }}
								disabled={disabledButton}
								variant="contained"
								//type="submit"
								color="primary"
								fullWidth
							>
								<IntlMessages id="dashboard.searchTextButton" />
							</Button>
						</Grid>
					
						<Grid xs={4} container justify="flex-end">			
							<Link component="button"
							 variant="body2" 
							onClick={() => handleSelectNew()}
							style={{ fontFamily: "Poppins, sans-serif", fontSize: '14px', fontWeight: 500, }}
							>
							    <AddIcon style={{fontSize:30, color:"#3699FF"}}/>
							    Crear nuevo usuario
							</Link>			
						</Grid>

					</Grid>
			
				
			
		</div>
		<ModalUsers/>
	</div>


					

	)
}

export default SearchUsers;