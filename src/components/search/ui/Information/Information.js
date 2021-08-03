import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation , useParams} from 'react-router-dom';
import { Grid, Paper} from '@material-ui/core';
import IntlMessages from 'util/IntlMessages';
import { startDocumentByIdVisibility, clearDocumentVisibility } from 'actions/documents';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BreadCrumbs from 'components/ui/Breadcrumbs'



import Preview from './ui/Preview'
import Metadata from './ui/Metadata'
import Comments from './ui/Comments'
import Attachments from './ui/Attachments'

const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	  overflow: 'hidden',
	  padding: theme.spacing(0, 2),
	},
	paper: {
	  maxWidth: 500,
	  margin: `${theme.spacing(1)}px auto`,
	  padding: theme.spacing(1),
	},
  }));

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
				<Box p={1}>
					<Typography component={'span'} >{children}</Typography>
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


const Information = () => {
	const dispatch = useDispatch();
	const { id, name} = useParams()

	const { authUser } = useSelector(state => state.auth);
	const classes = useStyles();
	const location = useLocation();
	const {state} = location
	const {permissions} = state
	console.log(permissions)
	const history = useHistory();
	const { docs } = useSelector(state => state.documents);

	const { comments = [], } = useSelector(state => state.info);

	const [value, setValue] = useState(0);

	const { authorities } = useSelector(state => state.auth);
	const ROLE_FILE_COMMENT = authorities.find(rol => rol === 'ROLE_FILE_COMMENT')
	const ROLE_FILE_ATTACHMENT = authorities.find(rol => rol === 'ROLE_FILE_ATTACHMENT')

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(()=>{
		dispatch(startDocumentByIdVisibility(id));

		return () => dispatch(clearDocumentVisibility())
	}, [id])
	
	return (
	
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">
				<h3 className="mb-0">
				<IntlMessages id="document.information" />
				<BreadCrumbs/>
				 </h3>
						<Grid container className="mt-2">
							<Grid item xs={6}>
							<div className={classes.root}>
								<Tabs
									value={value}
									onChange={handleChange}
									indicatorColor="primary"
									textColor="primary"
									centered
								>
								<Tab style={{fontFamily: 'Poppins', fontSize: "12px", fontWeight: 500, textTransform:"none" }} label={<IntlMessages id="document.information.general" />} {...a11yProps(0)} />
								<Tab style={{fontFamily: 'Poppins', fontSize: "12px", fontWeight: 500, textTransform:"none" }}label={<IntlMessages id="dashboard.comments" />} {...a11yProps(1)} /> 
								<Tab style={{fontFamily: 'Poppins', fontSize: "12px", fontWeight: 500, textTransform:"none" }}label={<IntlMessages id="document.attachment" />} {...a11yProps(2)} />
								</Tabs>

								<TabPanel value={value} index={0}>
									<Metadata/>
								</TabPanel>

								{(ROLE_FILE_COMMENT) &&
								<TabPanel value={value} index={1}>
									<Comments authUser={authUser} fileId={id}/>
								</TabPanel>
								}

								{(ROLE_FILE_ATTACHMENT) &&
								<TabPanel value={value} index={2}>
									<Attachments authUser={authUser} fileId={id} name={docs.name}/>
								</TabPanel>
								}

							</div>
							</Grid>

							<Grid item xs={6}>
								<Preview authUser={authUser} id={id} name={docs.name}/>
							</Grid>

						</Grid>
				</div>
			</div>
		</div>
		
		
			 
			
		
	)
}

export default Information;