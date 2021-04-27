import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IntlMessages from 'util/IntlMessages';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import SearchUsers from './ui/SearchUsers';
import SearchGroup from './ui/SearchGroup';
import { TableSearchUsers } from './ui/TableSearchUsers';
import { TableSearchGroup } from './ui/TableSearchGroup';


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

const Management = () => {

    const dispatch = useDispatch();
	const { authUser } = useSelector(state => state.auth);
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
        setValue(1)
		if (!authUser) {
			return;
		}

	}, [dispatch, authUser]);

	const Result = ()=>{
		switch (value) {
			case 0:
			return<TableSearchUsers/>
			case 1:
			return<TableSearchGroup/>
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
									<IntlMessages id="sidebar.tags.usersandgroup" />
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
									<Tab style={{fontFamily: 'Poppins', fontSize: "14px", fontWeight: 500, textTransform:"none",color:"#369bff"}} label="Administración de usuarios" {...a11yProps(0)} />
									<Tab style={{fontFamily: 'Poppins', fontSize: "14px", fontWeight: 500, textTransform:"none", color:"#369bff"}}label="Administración de grupos" {...a11yProps(1)} />
									
								</Tabs>
								<TabPanel value={value} index={0}>
									<SearchUsers/>
								</TabPanel>
								<TabPanel value={value} index={1}>
									<SearchGroup/>
								</TabPanel>
							</div>
						</div>
					</div>
				</div>

				<Result />
				
			</div>
		</div>

	);
}

export default Management;