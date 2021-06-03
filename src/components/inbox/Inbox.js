import React, { useEffect, useState } from 'react';
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
import { Tasks } from './ui/Tasks';
import { Manage } from './ui/Manage';
import { Tracing } from './ui/Tracing';
import { INBOX_STATUS } from 'constants/constUtil';
import { startActiveTasksInit, startFlowsAllInit } from 'actions/flowDocument';



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

const Inbox = () => {
	const dispatch = useDispatch();
	const { authUser } = useSelector(state => state.auth);
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const page = 1
	const [openTracing, setOpenTracing] = useState(null)


    useEffect(() => {
		
		setOpenTracing(null)

    }, [value])

	useEffect(() => {
		
			dispatch(startActiveTasksInit(authUser, page, INBOX_STATUS ))
			dispatch(startFlowsAllInit(authUser, page))
		
	  }, [dispatch])

	useEffect(() => {

		if (!authUser) {
			return;
		}

	}, [dispatch, authUser]);

	
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};


	return (
		
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">
					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">
							
							<div className="jr-card-header d-flex align-items-center">
								<h3 className="mb-0">
									<IntlMessages id="Gestión de documentos" />
								</h3>
							</div>
							<div className={classes.root}>
								<Tabs
									value={value}
									onChange={handleChange}
									indicatorColor="primary"
									textColor="primary"
									variant="fullWidth"
									centered
								>
									<Tab style={{fontFamily: 'Poppins', fontSize: "14px", fontWeight: 500, textTransform:"none",color:"#369bff"}} label="Mis Tareas" {...a11yProps(0)} />
									<Tab style={{fontFamily: 'Poppins', fontSize: "14px", fontWeight: 500, textTransform:"none", color:"#369bff"}}label="Mis Flujos" {...a11yProps(1)} />
									
								</Tabs>
								<TabPanel value={value} index={0}>
									<Tasks/>
								</TabPanel>
								<TabPanel value={value} index={1}>
									<Manage setOpenTracing={setOpenTracing}/>
								</TabPanel>
							</div>
						</div>
					</div>
				</div>
				{ Boolean(openTracing) && <Tracing/>}
			</div>
		</div>
	)
}

export default Inbox;