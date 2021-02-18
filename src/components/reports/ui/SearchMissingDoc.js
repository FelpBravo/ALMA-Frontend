import { Button, Divider, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import IntlMessages from 'util/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';
import { startReportsLoading} from 'actions/reports'
import { useHistory } from 'react-router-dom';
import { TableSearchReports } from './TableSearchReports';

const useStyles = makeStyles((theme) => ({
	buttons: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const SearchMissingDoc = () => {

	const classes = useStyles()
	const dispatch = useDispatch()
	const history = useHistory();
	const { authUser } = useSelector(state => state.auth)

	const [reportsDate, setReportsDate] = useState('')
	const [disabledButton, setDisabledButton] = useState(true);
	const [messageError, setMessageError] = useState('');

	const handleAdvanceSearchClear = () => {
	
		setDisabledButton(true)
	}

	const handleSearchReports = (e) => {
		e.preventDefault();
		
	}



	return (
             <div>
			    <div className="jr-card-header d-flex align-items-center">
					<h3 className="mb-0">
						<IntlMessages id="reports.missing.documents"/>
					</h3>
				</div>

			    <Grid item xs={12}>

					<Grid container spacing={3}>
                        <Grid item xs={3}>
                        <TextField
								label="Nombre/Rut cliente"
								variant="outlined"
								fullWidth
								//value={value ? moment(value).format(FORMAT_YYYY_MM_DD) : ''}
								//value={reportsDate.startDate || ''}
								size="small"
								InputLabelProps={{
												shrink: true,
											}
											}
								//onChange={event => setReportsDate({ startDate: event.target.value, endDate: reportsDate.endDate })}
							/>

                        </Grid>
						<Grid item xs={3}>
							<TextField
								label="Desde"
								variant="outlined"
								fullWidth
								type="date"
								//value={value ? moment(value).format(FORMAT_YYYY_MM_DD) : ''}
								//value={reportsDate.startDate || ''}
								size="small"
								InputLabelProps={{
												shrink: true,
											}
											}
								onChange={event => setReportsDate({ startDate: event.target.value, endDate: reportsDate.endDate })}
							/>
						</Grid>
						<Grid item xs={3}>
							<TextField
								label="Hasta"
								variant="outlined"
								fullWidth
								type="date"
								value={reportsDate.endDate || ''}
								size="small"
								InputLabelProps={{
												shrink: true,
											}
											}
								onChange={event => setReportsDate({ startDate: reportsDate.startDate, endDate: event.target.value })}
							/>
						</Grid>
						<br />
						<span className="text-danger text-error">{messageError}</span>
						</Grid>

								

								<Grid
									container
									justify="flex-end"
									alignItems="flex-end"
                                    className="mt-3"
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
											disabled={disabledButton}
											type="submit"
											variant="contained"
											color="primary"
											onClick={handleSearchReports}
										>
											<IntlMessages id="Generar" />
										</Button>
									</div>

								</Grid>
							</Grid>
						</div>


					

	)
}

export default SearchMissingDoc;