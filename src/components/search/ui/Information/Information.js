import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation , useParams} from 'react-router-dom';
import { Button, Grid, Paper} from '@material-ui/core';
import { startVersioningLoading ,versioningRemove} from 'actions/search';
import IntlMessages from 'util/IntlMessages';
import { startDocumentByIdVisibility } from 'actions/documents';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { downloadDocument } from 'services/filesService';


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


const Information = () => {
	const dispatch = useDispatch();
	const { id, name } = useParams()
	const { authUser } = useSelector(state => state.auth);
	const classes = useStyles();
	const location = useLocation();
	const history = useHistory();
	const { docs } = useSelector(state => state.documents);

    const [pdf, setPDF] = React.useState('')

	const [value, setValue] = React.useState(0);

	console.log(docs);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

		console.log('ID!',id);

	useEffect(() => {

		if (!authUser) {
			return;
		}

	}, [dispatch, authUser]);

	useEffect(()=>{
		dispatch(startDocumentByIdVisibility(id));
	},[])
	
    const getPDF = async () => {
	    setPDF('')
	    if (docs.fileId) {
	      const { data } = await downloadDocument(authUser, docs.fileId);
		  const file = new Blob([data], { type: 'application/pdf' });
		  setPDF(URL.createObjectURL(file))
	
		}
	  }
	
	  useEffect(() => {
		getPDF()
	  }, [docs])
	
    const PDFcomponent = () => {
		if (pdf != '') {
		  return (
			<div style={{ width: '100%', height: '100%' }}>
			  <object
				data={pdf}
				type="application/pdf"
				width="100%"
				height="80%"
			  >
				<iframe src={pdf} width="100%" height="80%">
				  <a href={pdf} id="enlaceDescargarPdf"
					download={docs.name}
				  >Tu dispositivo no puede visualizar los PDF, da click aquí para descargarlo</a>
				</iframe>
	
			  </object>
			</div>
	
	
		  )
		}
		else {
		  return (<><p>Cargando...</p></>)
		}
	
	  }
	
	const Metadatacomponent = () => {
		if (docs.fileId) {
		  return (
			<div>
			  <span className="badge badge-primary ">{docs.aspectGroup.name}</span>
			  {docs.aspectGroup.aspectList.map((a) => {
				return <div className={classes.root}>
				  <Paper className={classes.paper}>
				  <div style={{ fontSize:"16px", fontFamily:"Poppins", fontWeight: '500' }}className='mt-2'>{a.label}</div>
					{a.customPropertyList.map((p) => {
					  return <div className="container">
						<div  style={{ padding: "9px 6px 9px 0px"}} className="row">
						  <div style={{ fontSize:"13px", fontFamily:"Poppins", fontWeight: 'bold' }}>
							{p.label}:
					</div>
						  <div style={{ fontSize:"13px", fontFamily:"Poppins"}} className='ml-1'>
							{isNaN(Date.parse(p.value)) ? p.value : new Date(p.value).toLocaleDateString()}
						  </div>
						</div>
					  </div>
					})}
				  </Paper>
				</div>
			  })}
	
			</div>
		  )
		}
		else {
		  return (<></>)
		}
	  }	  


	return (
	
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">
				<h3 className="mb-0">
				<IntlMessages id="Informacion Documento" />
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
									<Tab style={{fontFamily: 'Poppins', fontSize: "12px", fontWeight: 500}} label="Metadata" {...a11yProps(0)} />
									<Tab style={{fontFamily: 'Poppins', fontSize: "12px", fontWeight: 500}}label="Comentarios" {...a11yProps(1)} />
									<Tab style={{fontFamily: 'Poppins', fontSize: "12px", fontWeight: 500}}label="Documentos adjuntos" {...a11yProps(2)} />
								</Tabs>
								<TabPanel value={value} index={0}>
									<Metadata/>
								</TabPanel>
								<TabPanel value={value} index={1}>
									<Comments/>
								</TabPanel>
								<TabPanel value={value} index={2}>
									<Attachments/>
								</TabPanel>
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