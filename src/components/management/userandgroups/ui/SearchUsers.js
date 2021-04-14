import React, { useState, useEffect } from 'react';
import { Button, InputBase, Grid, makeStyles, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory,useLocation } from 'react-router-dom';
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

	const history = useHistory();

	const useQuery = () => new URLSearchParams(useLocation().search);

	let query = useQuery();

	const search = query.get("search")

	const [disabledButton, setDisabledButton] = useState(true);

	const [messageError, setMessageError] = useState('');

	const [ searchText, setSearchText ] = useState('')

	useEffect(()=>{
		setSearchText(search)
	},[search])

    const handleSelectNew = () => {
		dispatch(openModalUsers());
	}

	const handleOnChange = ({target}) =>{
		const { value } = target
		if(value.length > 1){
			setDisabledButton(false)
			setMessageError('')
		}
		else
		{
			setDisabledButton(true)
			setMessageError('Tiene que tener 3 caracteres como minimo')
		}
		setSearchText(value)
	}

	const handleOnSearch = ()=>{
		history.push(`/management/usersandgroups?search=${searchText}`);
	}

	return (
		<div className="row">
		<div className="col-xl-12 col-lg-12 col-md-12 col-12">
					<form onSubmit={handleOnSearch}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Paper className={classes.root}>
								<SearchIcon color="primary" />
								<InputBase
									className={classes.input}
									value={searchText}
									name="inputSearch"
									fullWidth
									placeholder="Buscar por nombre de usuario"
									onChange={handleOnChange}
									required
								/>
							</Paper>
							<span className="text-danger text-error">{messageError}</span>
						</Grid>

						<Grid item xs={2}>
							<Button
								style={{ paddingTop: "10px", paddingBottom: "10px", fontFamily: "Poppins, sans-serif", fontSize: '12px', fontWeight: 600, }}
								disabled={disabledButton}
								variant="contained"
								type="submit"
								color="primary"
								fullWidth
							>
								<IntlMessages id="dashboard.searchTextButton" />
							</Button>
						</Grid>
					
						<Grid xs={4} container justify="flex-end">
							<div style={{ border:'1px solid "#3699FF'}}>
							<Link component="button"
							 variant="body2" 
							onClick={() => handleSelectNew()}
							style={{ fontFamily: "Poppins, sans-serif", fontSize: '14px', fontWeight: 500, }}
							>
							    <AddIcon style={{fontSize:30, color:"#3699FF"}}/>
							    Crear nuevo usuario
							</Link>	
							</div>			
									
						</Grid>

					</Grid>
					</form>
			
				
			
		</div>
		<ModalUsers/>
	</div>


					

	)
}

export default SearchUsers;