import React, { useEffect } from 'react';
import DateSearchReports from './ui/DateSearchReports.js';
import { TableSearchReports } from './ui/TableSearchReports';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IntlMessages from 'util/IntlMessages';


const useStyles = makeStyles({
	root: {
	  flexGrow: 1,
	},
  });
  
const Reports = () => {
	const dispatch = useDispatch();
	const { authUser } = useSelector(state => state.auth);
	const classes = useStyles();
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

	useEffect(() => {

		if (!authUser) {
			return;
		}

	}, [dispatch, authUser]);

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
			<div className={classes.root}>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					centered
				>
					<Tab label="Item One" />
					<Tab label="Item Two" />
					<Tab label="Item Three" />
				</Tabs>
			</div>
		</div>
		</div>
		</div>
		</div>
		</div>
	)
}

export default Reports;