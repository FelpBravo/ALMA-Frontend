import { Button, Divider, Grid, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import IntlMessages from 'util/IntlMessages';

const useStyles = makeStyles((theme) => ({
	buttons: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const Reports = () => {

    const classes = useStyles();

	const handleOnChange = ({ target }) => {
		const { value } = target;

	}

	const handleSearchReports = (e) => {
		e.preventDefault();
	
		//history.push(`/search`);
	}
	

	
	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							<div className="jr-card-header d-flex align-items-center">
								<h3 className="mb-0">
									<IntlMessages id="reports.title" />
								</h3>
							</div>
                            <Grid item xs={12}>

							<Grid container>
							<Grid item xs={3}>
								<TextField
									label= "Desde"
									variant="outlined"
									fullWidth
									type="date"
									//value={value ? moment(value).format(FORMAT_YYYY_MM_DD) : ''}
									size="small"
									InputLabelProps={{
										shrink: true,
									}
									}
									onChange={handleOnChange}
								/>
								</Grid>
								<Grid className="ml-3" item xs={3}>
								<TextField
									label="Hasta"
									variant="outlined"
									fullWidth
									type="date"
									//value={value ? moment(value).format(FORMAT_YYYY_MM_DD) : ''}
									size="small"
									InputLabelProps={{
										shrink: true,
									}
									}
									onChange={handleOnChange}
								/>
								</Grid>
											</Grid>

						<Divider className="mt-3" />

						<Grid
							container
							justify="flex-end"
							alignItems="flex-end"
						>
							<div className={classes.buttons}>
								<Button
								    style={{ backgroundColor:'#E1F0FF', color: '#3699FF', fontFamily: "Poppins", fontSize: '12px', fontWeight: 600, 	border: "none",
									boxShadow: "none", height:'45px',width: '120px'}}
									type="button"
									variant="contained"
									//onClick={handleAdvanceSearchClear}
								>
									<IntlMessages id="dashboard.advancedSearchClear" />
								</Button>

								<Button
								    style={{  fontFamily: "Poppins", fontSize: '12px', fontWeight: 600, border: "none",
									boxShadow: "none", height:'45px', width: '120px'}}
									type="submit"
									variant="contained"
									color="primary"
									onClick={handleSearchReports}
								>
									<IntlMessages id="dashboard.advancedSearchText" />
								</Button>
							</div>

						</Grid>
					</Grid>

								
					    </div>
				    </div>
			    </div>
		    </div>
        </div>

	)
}

export default Reports;