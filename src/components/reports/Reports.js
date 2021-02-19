import React, { useEffect } from 'react';
import SearchReports from './ui/SearchReports';
import { TableSearchReports } from './ui/TableSearchReports';
import { TableSearchMissing } from './ui/TableSearchMissing';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IntlMessages from 'util/IntlMessages';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import SearchMissingDoc from './ui/SearchMissingDoc.js';
import SearchWithout from './ui/SearchWithout';
import { TableSearchWithout } from './ui/TableSearchWithout';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

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

	const Result = ()=>{
		switch (value) {
			case 0:
			return <TableSearchReports/>
			case 1:
			return <TableSearchMissing/>
			case 2:
			return <TableSearchWithout/>
			default:
				return <></>
		}
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
							<div className={classes.root}>

								<Tabs
									value={value}
									onChange={handleChange}
									indicatorColor="primary"
									textColor="primary"
									centered
								>
									<Tab style={{fontFamily: 'Poppins', fontSize: "14px", fontWeight: 500}} label="Carga Masiva" {...a11yProps(0)} />
									<Tab style={{fontFamily: 'Poppins', fontSize: "14px", fontWeight: 500}}label="Documentos Faltantes" {...a11yProps(1)} />
									<Tab style={{fontFamily: 'Poppins', fontSize: "14px", fontWeight: 500}}label="Documentos sin contenido " {...a11yProps(2)} />
								</Tabs>
								<TabPanel value={value} index={0}>
									<SearchReports />
								</TabPanel>
								<TabPanel value={value} index={1}>
									<SearchMissingDoc />
								</TabPanel>
								<TabPanel value={value} index={2}>
									<SearchWithout/>
								</TabPanel>
							</div>
						</div>
					</div>
				</div>

				<Result />
				
			</div>
		</div>
	)
}

export default Reports;