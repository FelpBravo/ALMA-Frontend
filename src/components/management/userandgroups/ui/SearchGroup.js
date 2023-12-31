import { Button, Grid, OutlinedInput } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { openModalGroup } from 'actions/adminUsersAndGroup';
import { searchSetText, startSearchLoading } from 'actions/search';
import { hasAuthority } from 'util/authorities';
import IntlMessages from 'util/IntlMessages';
import { FormattedMessage } from 'react-intl';

import ModalGroup from './ModalGroup';

const SearchGroup = () => {

	const { authUser } = useSelector(state => state.auth);

	const dispatch = useDispatch();

	const history = useHistory();

	const useQuery = () => new URLSearchParams(useLocation().search);

	let query = useQuery();

	const searchGroup = query.get("searchGroup")

	const [disabledButton, setDisabledButton] = useState(true);

	const [messageError, setMessageError] = useState('');

	const [searchText, setSearchText] = useState('')

	const canCreateGroups = useSelector(hasAuthority('ROLE_GROUPS_CREATE'));

	useEffect(() => {
		setSearchText(searchGroup)
	}, [searchGroup])

	const handleOnChange = ({ target }) => {
		const { value } = target
		if (value.length > 1) {
			setDisabledButton(false)
			setMessageError('')
		}
		else {
			setDisabledButton(true)
			setMessageError(<IntlMessages id="user.required.search" />)
		}
		setSearchText(value)
	}

	const handleOnSearch = () => {
		history.push(`/management/usersandgroups/group/?searchGroup=${searchText}`);
	}

	const handleSelectNew = () => {
		dispatch(openModalGroup());
	}


	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<form onSubmit={handleOnSearch}
				>
					<Grid container spacing={1}>
						<Grid item xs={6}>
						<FormattedMessage id="group.search">
							{
								placeholder => (
									<OutlinedInput
										style={{ height: 41, fontFamily: "Poppins, sans-serif", fontSize: '12px', fontWeight: 600, }}
										value={searchText}
										name="inputSearch"
										fullWidth
										placeholder={placeholder}
										onChange={handleOnChange}
										required
										startAdornment={<SearchIcon color="primary" />}
									/>
								)
							}
						</FormattedMessage>
							
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
						{
							canCreateGroups &&
							<Grid xs={3} container>
								<Link
									component="button"
									variant="body2"
									onClick={() => handleSelectNew()}
									style={{ fontFamily: "Poppins, sans-serif", fontSize: '14px', fontWeight: 500, marginLeft: 10 }}
								>
									<AddIcon style={{ fontSize: 30, color: "#3699FF", marginLeft: 10 }} />
									<IntlMessages id="group.create" />
								</Link>
							</Grid>
						}

					</Grid>
				</form>

				<ModalGroup />
			</div>
		</div>




	)
}

export default SearchGroup;