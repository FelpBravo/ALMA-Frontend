import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IntlMessages from 'util/IntlMessages';
import DataTable from './DataTable';
import { Divider, Grid, IconButton, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Swal from 'sweetalert2';
import { startSaveSearchLoading} from '../../../actions/search';

const useStyles = makeStyles((theme) => ({
	buttons: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	pointer: {
		cursor: 'pointer',
		fontWeight: '400',
		color: '#FFA800',
		marginLeft: 10,
	},

}));

export const TableSearch = () => {

	const classes = useStyles();
	const { authUser } = useSelector(state => state.auth);

	const { documents = {}, fields = [], textSearch = '' } = useSelector(state => state.searchs);
	const { data = [], totalItems = 0 } = documents;
	const dispatch = useDispatch();
	const { filters = [] } = fields;

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

		dispatch(startSaveSearchLoading(authUser, filtersData));

		//history.push(`/search/p1`);

	}

	
	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">

					<div className="jr-card-header d-flex align-items-center">
						<div>
						<h3 className="mb-0">
							<IntlMessages id="dashboard.searchResults" />
						</h3>
						<span className="user-description mt-2 mr-2">Total documentos encontrados {totalItems}</span>
						</div>
						<div style={{color: '#FFA800'}} className="row ml-auto">
						
                           
							
						</div>

						<Grid
							item xs={3} 
							onClick={handleSaveSearch}
							container
							alignItems="center">
							<SaveOutlinedIcon className={classes.pointer}/>
							<span className={classes.pointer}>
								<IntlMessages id="dashboard.saveSearch" />
							</span>
						</Grid>
					</div>

					<DataTable />

				</div>
			</div>
		</div>
	)
}
