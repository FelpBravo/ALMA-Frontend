import React, { useState, useEffect } from 'react';
import { Button, InputBase, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import IntlMessages from 'util/IntlMessages';
import { searchSetText, startSearchLoading } from 'actions/search';
import { AdvancedSearch } from './AdvancedSearch';
import SearchIcon from '@material-ui/icons/Search';
//import SearchIcon from './search.svg';

export const EditTextSearch = ({ }) => {

	const { authUser } = useSelector(state => state.auth);

	const { textSearch = '', fields } = useSelector(state => state.searchs);
	const { maxTermLength = 3, minTermLength = 20 } = fields;

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
			setMessageError(`Mínimo caracteres ${minTermLength}`);
			return;
		}

		if (searchText.length > maxTermLength) {
			setDisabledButton(true);
			setMessageError(`Mánimo caracteres ${maxTermLength}`);
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
						<div className="ml-auto">
							<span className="custom-link-dash">

							</span>
						</div>
					</div>
					<form onSubmit={handleSearch}>
						<Grid container spacing={2}>

							<Grid item xs={9}>
                                <InputBase
								    component={SearchIcon} 
									value={searchText}
									name="inputSearch"
									className="custom-text-field"
									fullWidth
									placeholder="Buscar por nombre de documento"
									onChange={handleOnChange}
								/>
								<span className="text-danger text-error">{messageError}</span>
							</Grid>

							<Grid item xs={3}>
								<Button
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

					<AdvancedSearch />
				</div>
			</div>
		</div>
	)
}
