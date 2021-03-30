import { Button, Divider, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import IntlMessages from 'util/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';
import { startReportsLoading , clearReports} from 'actions/reports'
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
	buttons: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const SearchUsers = () => {
	const classes = useStyles()
	const dispatch = useDispatch()



	return (
             <div>
				<div className="jr-card-header d-flex align-items-center">
					<h3 className="mb-0">
					
					</h3>
				</div>
				<Grid item xs={12}>

					<Grid container>
						<Grid item xs={3}>
							<TextField
								label="Desde"
								variant="outlined"
								fullWidth
								type="date"
								//value={reportsDate.startDate || ''}
								size="small"
								InputLabelProps={{
												shrink: true,
											}
											}
								//onChange={event => setReportsDate({ startDate: event.target.value, endDate: reportsDate.endDate })}
							/>
						</Grid>
						<Grid className="ml-3" item xs={3}>
							<TextField
								label="Hasta"
								variant="outlined"
								fullWidth
								type="date"
								//value={reportsDate.endDate || ''}
								size="small"
								InputLabelProps={{
												shrink: true,
											}
											}
								//onChange={event => setReportsDate({ startDate: reportsDate.startDate, endDate: event.target.value })}
							/>
						
								
						</Grid>
					</Grid>

						<Grid
							container
							justify="flex-end"
							alignItems="flex-end"
						>
							<div className={classes.buttons}>
								<Button
									style={{
										backgroundColor: '#E1F0FF', color: '#3699FF', fontFamily: "Poppins", fontSize: '12px', fontWeight: 600, border: "none",
										boxShadow: "none", height: '45px', width: '120px'}}
										type="button"
										variant="contained"
										//onClick={handleAdvanceSearchClear}
								>
								<IntlMessages id="dashboard.advancedSearchClear" />
								</Button>

								<Button
									style={{
												fontFamily: "Poppins", fontSize: '12px', fontWeight: 600, border: "none",
												boxShadow: "none", height: '45px', width: '120px'
									}}
									//disabled={disabledButton}
									type="submit"
									variant="contained"
									color="primary"
									//onClick={handleSearchReports}
								>
									<IntlMessages id="reports.search" />
								</Button>
							</div>

						</Grid>
					</Grid>
				
				</div>


					

	)
}

export default SearchUsers;