import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Grid, IconButton, Button } from '@material-ui/core';
import IntlMessages from 'util/IntlMessages';
import { getRows } from 'helpers/getRows';
import { AdvancedSarchFilters } from './AdvancedSarchFilters';
import { useHistory, useLocation } from 'react-router-dom';
import { searchClearAllFilters, startSearchLoading, changeCleanFilter, startSaveSearchLoading } from '../../../../actions/search';
import { DATERANGE } from 'constants/constUtil';
import Swal from 'sweetalert2';
import TagsPrueba from './TagsPrueba.js'
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
	buttons: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	pointer: {
		cursor: 'pointer'
	}
}));

export const AdvancedSearch = () => {

	const { authUser } = useSelector(state => state.auth);

	const classes = useStyles();

	const isMounted = React.useRef(true);

	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const { fields = {} } = useSelector(state => state.searchs);

	const { filters = [] } = fields;

	const [iconAdvancedSearch, setIconAdvancedSearch] = useState('zmdi-chevron-down');
	const [openAdvancedSearch, setOpenAdvancedSearch] = useState(false);

	let DateRange = []
	let tags = ['a', 'b']

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

		const exists = filters.filter(filter => filter.value);

		if (exists.length === 0) {
			return Swal.fire({
				title: 'Error',
				text: 'Debe seleccionar un filtro',
				icon: 'error',
				heightAuto: false,
			});
		}

		dispatch(startSearchLoading(authUser, '', exists));

		history.push(`/search/p1`);

	}

	const handleSaveSearch = () => {

		const exists = filters.filter(filter => filter.value);

		if (exists.length === 0) {
			return Swal.fire({
				title: 'Error',
				text: 'Debe seleccionar un filtro',
				icon: 'error',
				heightAuto: false,
			});
		}

		const filtersData = exists.map( ({name, value}) => ({name, value}) )

		dispatch(startSaveSearchLoading(authUser, 'test', filtersData));

		//history.push(`/search/p1`);

	}


	const handleAdvanceSearchClear = () => {
		dispatch(searchClearAllFilters());
	}

	const handlePrintFields = () => {

		const Dato = filters.filter((item) => item.type != DATERANGE)
		DateRange = filters.filter((item) => item.type === DATERANGE)

		const columns = 4;
		const rows = getRows(Dato, columns);

		return [...Array(rows)].map((row, i) => {

			return (
				<div className="row" key={i}>
					{
						Dato
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
	const handlePrintFieldsDateRange = () => {




		const columns = 2;
		const rows = getRows(DateRange, columns);

		return [...Array(rows)].map((row, i) => {

			return (
				<div className="row" key={i}>
					{
						DateRange
							.slice(
								i === 0 ? i : i * columns,
								i === 0 ? columns : i * columns + columns
							)
							.map((item) => {
								return (
									<div
										key={item.name}
										className="col-xl-6 col-lg-6 col-md-12 col-12 mb-3"

									>
										<AdvancedSarchFilters {...item} />
									</div>
								)
							})}
				</div>
			)
		})

	}



	return (
		<Grid container item xs={12}>
			<Grid item container wrap="nowrap" xs={12}>
				<Grid item md={2} wrap="nowrap" container alignItems="center">
					<span className="text-advanced-search">
						<IntlMessages id="dashboard.advancedSearch" />
					</span>

					<IconButton onClick={handleOpenAdvanced} color='primary'>
						<i className={`zmdi ${iconAdvancedSearch}`} />
					</IconButton>
				</Grid>
				<Grid
					className={classes.pointer}
					item md={2} onClick={handleSaveSearch}
					container
					wrap="nowrap"
					alignItems="center">
					<SaveIcon />
					<span className="text-advanced-search">
						<IntlMessages id="dashboard.saveSearch" />
					</span>
				</Grid>
			</Grid>

			{
				openAdvancedSearch
				&&
				<>
					<Grid item xs={12}>

						<h4 className="mb-4">
							<IntlMessages id="dashboard.advancedSearchTitle" />
						</h4>

						<Grid item xs={12}>
							{filters.length > 0 && handlePrintFields()}
						</Grid>

					</Grid>

					{DateRange.length > 0 &&
						<Grid item xs={12}>

							<h4 className="mb-4">
								<IntlMessages id="dashboard.advancedSearchDate" />
							</h4>

							<Grid item xs={12}>
								{DateRange.length > 0 && handlePrintFieldsDateRange()}
							</Grid>

						</Grid>
					}
					{tags.length > 0 &&
						<Grid item xs={12}>

							<h4 className="mb-4">
								<IntlMessages id="dashboard.advancedSearchTags" />
							</h4>

							<Grid item xs={12}>
								<TagsPrueba></TagsPrueba>
							</Grid>

						</Grid>
					}
					<Grid item xs={12}>
						{/*<Divider className="mt-3" />*/}

						<Grid
							container
							justify="flex-end"
							alignItems="flex-end"
						>
							<div className={classes.buttons}>
								<Button
									style={{
										backgroundColor: '#E1F0FF', color: '#3699FF', fontFamily: "Poppins", fontSize: '12px', fontWeight: 600, border: "none",
										boxShadow: "none", height: '45px', width: '120px'
									}}
									type="button"
									variant="contained"
									onClick={handleAdvanceSearchClear}
								>
									<IntlMessages id="dashboard.advancedSearchClear" />
								</Button>

								<Button
									style={{
										fontFamily: "Poppins", fontSize: '12px', fontWeight: 600, border: "none",
										boxShadow: "none", height: '45px', width: '120px'
									}}
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
				</>

			}

		</Grid>
	)
}
