import { Button, Divider, Grid, makeStyles } from '@material-ui/core';
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
									//onClick={handleAdvanceSearch}
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