import React, { useEffect , useState} from 'react';
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
import { useHistory, useLocation, useParams,useRouteMatch  } from 'react-router-dom';


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
	
	const { path, url } = useRouteMatch();

	const [value, setValue] = useState(path === '/management/usersandgroups/group'? 1:0);

	const history = useHistory();

	

	const handleChange = (event, newValue) => {
		history.push(newValue === 1 ? '/management/usersandgroups/group':'/management/usersandgroups');
	};

	useEffect(() => {
		path === '/management/usersandgroups/group'? setValue(1): setValue(0)
			
		if (!authUser) {
			return;
		}

	}, [dispatch, authUser,path]);

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
									<Tab style={{fontFamily: 'Poppins', fontSize: "14px", fontWeight: 500, textTransform:"none",color:"#369bff"}} label={<IntlMessages id="sidebar.tags.usersandgroup" />} {...a11yProps(0)} />
									<Tab style={{fontFamily: 'Poppins', fontSize: "14px", fontWeight: 500, textTransform:"none", color:"#369bff"}} label="Administración de grupos" {...a11yProps(1)} />
									
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