import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Grid, IconButton, Button } from '@material-ui/core';
import IntlMessages from 'util/IntlMessages';
import { getRows } from 'helpers/getRows';
import { AdvancedSarchFilters } from './AdvancedSarchFilters';
import { useHistory, useLocation } from 'react-router-dom';
import { searchClearAllFilters, startSearchLoading } from 'actions/search';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
	buttons: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

export const AdvancedSearch = () => {

	const classes = useStyles();

	const isMounted = React.useRef(true);

	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const { fields = {} } = useSelector(state => state.searchs);

	const { filters = [] } = fields;

	const [iconAdvancedSearch, setIconAdvancedSearch] = useState('zmdi-chevron-down');
	const [openAdvancedSearch, setOpenAdvancedSearch] = useState(false);

	useEffect(() => {

		return () => {
			isMounted.current = false;
		}

	}, []);

	useEffect(() => {

		if (openAdvancedSearch) {
			if (isMounted.current) {
				setIconAdvancedSearch('zmdi-chevron-up');
			}
		} else {
			if (isMounted.current) {
				setIconAdvancedSearch('zmdi-chevron-down');
			}
		}

	}, [openAdvancedSearch])

	const handleOpenAdvanced = () => {
		setOpenAdvancedSearch(!openAdvancedSearch);
	}

	const handleAdvanceSearch = () => {
		//console.log(filters);

		const exists = filters.filter(filter => filter.value);

		if (exists.length === 0) {
			return Swal.fire({
				title: 'Error',
				text: 'Debe seleccionar un filtro',
				icon: 'error',
				heightAuto: false,
			});
		}

		dispatch(startSearchLoading('', exists));

		if (location.pathname !== '/search') {
			history.push(`/search`);
		}

	}

	const handleAdvanceSearchClear = () => {
		console.log(filters);
		dispatch(searchClearAllFilters());
		console.log(filters);
	}

	const handlePrintFields = () => {

		const columns = 4;
		const rows = getRows(filters, columns);

		return [...Array(rows)].map((row, i) => {

			return (
				<div className="row" key={i}>
					{
						filters
							.slice(
								i === 0 ? i : i * columns,
								i === 0 ? columns : i * columns + columns
							)
							.map((item) => {
								return (
									<div
										key={item.name}
										className="col-xl-3 col-lg-3 col-md-6 col-6 mb-3"
									>
										<AdvancedSarchFilters {...item} />
									</div>
								)
							})
					}
				</div>
			);

		});

	}

	return (
		<Grid item xs={12}>
			<span className="text-advanced-search">
				<IntlMessages id="dashboard.advancedSearch" />
			</span>
			<IconButton onClick={handleOpenAdvanced}>
				<i className={`zmdi ${iconAdvancedSearch}`} />
			</IconButton>

			{
				openAdvancedSearch
				&&
				<Grid item xs={12}>

					<h4 className="mb-4">
						<IntlMessages id="dashboard.advancedSearchTitle" />
					</h4>

					<Grid item xs={12}>

						{filters.length > 0 && handlePrintFields()}

						<Divider className="mt-3" />

						<Grid
							className="buttons-search mt-3"
							container
							justify="flex-end"
							alignItems="flex-end"
						>
							<div className={classes.buttons}>
								<Button
									type="button"
									variant="contained"
									onClick={handleAdvanceSearchClear}
								>
									<IntlMessages id="dashboard.advancedSearchClear" />
								</Button>

								<Button
									type="submit"
									variant="contained"
									color="primary"
									onClick={handleAdvanceSearch}
								>
									<IntlMessages id="dashboard.advancedSearchText" />
								</Button>
							</div>

						</Grid>
					</Grid>

				</Grid>
			}

		</Grid>
	)
}
