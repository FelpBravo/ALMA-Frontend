import React, { useState, useEffect } from 'react';
import { Button, InputBase, Grid, makeStyles, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import { searchSetText, startSearchLoading } from '../../../actions/search';
import { AdvancedSearch } from './AdvancedSearch/AdvancedSearch';
import SearchIcon from '@material-ui/icons/Search';


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

export const EditTextSearch = ({ savedSearchId }) => {

	const classes = useStyles();

	const { authUser } = useSelector(state => state.auth);

	const { textSearch = '', fields } = useSelector(state => state.searchs);

	const { maxTermLength = 20, minTermLength = 3 } = fields;

	const dispatch = useDispatch();

	const history = useHistory();

	const [searchText, setSearchText] = useState(textSearch);

	const [disabledButton, setDisabledButton] = useState(true);
	const [messageError, setMessageError] = useState('');

	useEffect(() => {

		if (!searchText) {
			setDisabledButton(true);
			setMessageError('');
			return;
		}

		if (searchText.length < minTermLength) {
			setDisabledButton(true);
			setMessageError(`Minimo ${minTermLength} caracteres`);
			return;
		}

		if (searchText.length > maxTermLength) {
			setDisabledButton(true);
			setMessageError(`Máximo ${maxTermLength} caracteres`);
			return;
		}

		setDisabledButton(false);
		setMessageError('');

	}, [searchText]);

	const handleOnChange = ({ target }) => {
		setSearchText(target.value);
		dispatch(searchSetText(target.value));
	}

	const handleSearch = (e) => {
		e.preventDefault();
		dispatch(startSearchLoading(authUser, searchText));

		history.push(`/search`);
	}

	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">

					<div className="jr-card-header d-flex align-items-center">
						<h3 className="mb-0">
							<IntlMessages id="dashboard.searchDocuments" />
						</h3>
					</div>
					<form onSubmit={handleSearch}>
						<Grid container spacing={2}>

							<Grid item xs={9}>
								<Paper className={classes.root}>
									<SearchIcon color="primary" />
									<InputBase
										className={classes.input}
										value={searchText}
										name="inputSearch"
										//className="custom-text-field"
										fullWidth
										placeholder="Buscar documento..."
										onChange={handleOnChange}
									/>
									
								</Paper>
								<span className="text-danger text-error">{messageError}</span>
							</Grid>

							<Grid item xs={3}>
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

						</Grid>
					</form>
					<AdvancedSearch savedSearchId={savedSearchId} />
				</div>
			</div>
		</div>
	)
}
