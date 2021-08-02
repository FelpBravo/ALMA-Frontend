import { Button, Divider, Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { CommentRoleCreeInit, CommentRoleInit, manageSetValueField, startAcceptTasksCreeInit } from 'actions/flowDocument';
import { SummaryInvolved } from 'components/documents/resume/SummaryInvolved';
import { TextField } from 'components/ui/Form';
import IntlMessages from 'util/IntlMessages';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

import ModalComments from './ModalComments';
import { TableDocsCree } from './TableDocsCree';
import { TableDocPrincipal } from './TableDocPrincipal';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import PropTypes from "prop-types";
import CommentRole from './CommentRole';
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';
import { isEmpty } from 'lodash';
import { IconButton } from '@material-ui/core';
import { saveCommentsCree } from 'actions/information';

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
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	input: {
		display: 'none',
	},
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: theme.palette.background.paper
	}

}));

const ManageCree = () => {

	const classes = useStyles();
	const dispatch = useDispatch();
	const { authUser } = useSelector(state => state.auth);
	const { involved, taskId, role, author, expiresAt, fileId, flowId } = useSelector(state => state.flowDocument);
	//const { comment, approves, users } = involved

	const [value, setValue] = React.useState(null);

	const history = useHistory();

	const [name, setName] = useState()
	const [file, setFile] = useState()
	const [dateActive, setDateActive] = useState(false)
	const [commentCreate, setCommentCreate] = useState();
	const [value1, setValue1] = React.useState(0);

	const approves = {}

	const handleChange1 = (event, newValue) => {
		setValue1(newValue);
	};

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const handleBackGo = () => {
		history.goBack()
	}

	const handleAcceptTask = () => {
		if (role === "owner" || role === "autor") {
			dispatch(startAcceptTasksCreeInit(authUser, taskId, value === "true", commentCreate, role, approves, file))
			handleBackGo()
		}
		else {
			dispatch(startAcceptTasksCreeInit(authUser, taskId, value === "true", commentCreate, role, [], file))
			handleBackGo()
		}
	}
	const handleChangeRedux = ({ target }) => {
		const { name, value } = target;
		setCommentCreate(value)
		dispatch(manageSetValueField(name, value));
	}

	const handleChangeFile = (event) => {
		event.preventDefault();
		setName(event.target.files[0].name)
		setFile(event.target.files[0])
	}

	const handleClear = () => {
		setFile()
		setName()
	}
	const handleOpenComment = () => {
		dispatch(CommentRoleInit(authUser, flowId, role))
		setDateActive(true)
	}
	const handleCloseComment = () => {
		setDateActive(false)
	}
	
	const handleSubmit = async e => {
		e.preventDefault()
	    dispatch(saveCommentsCree(authUser, flowId, taskId))
		setName()
		setFile()

	}
	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">
					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">
							<div className={classes.root}>

								<Tabs
									value={value1}
									onChange={handleChange1}
									//variant="scrollable"
									//scrollButtons="on"
									indicatorColor="primary"
									textColor="primary"
									centered
								//aria-label="scrollable force tabs example"
								>
									<Tab
										style={{ fontFamily: 'Poppins', fontSize: "14px", fontWeight: 500, textTransform: "none" }}
										label={<IntlMessages id="document.cree.manage.approv" />}
										icon={<DescriptionOutlinedIcon />}
										{...a11yProps(0)}
									/>
									<Tab
										style={{ fontFamily: 'Poppins', fontSize: "14px", fontWeight: 500, textTransform: "none" }}
										label={<IntlMessages id="document.cree.manage.comment" />}
										icon={<CommentOutlinedIcon />}
										{...a11yProps(1)}
									/>
								</Tabs>

								<TabPanel value={value1} index={0}>


									<h3><IntlMessages id="document.cree.manage.principal" /></h3>

									<TableDocPrincipal />

									<Divider className="mt-3 mb-3" />
									<h3><IntlMessages id="document.cree.manage.relacion" /></h3>

									<TableDocsCree />

									<Divider className="mt-3 mb-3" />
									<h3><IntlMessages id="document.cree.manage.general" /></h3>

									<Grid container item xs={12}>
										<TextField
											multiline
											rows={3}
											value={involved.comment}
											disabled
										/>
									</Grid>

									<Divider className="mt-3 mb-3" />
									<h3><IntlMessages id="document.title.creeDocument1" /></h3>
									<p className="user-description">
										<span className="owner-most-viewed-documents">{author}</span>
										{` `}<IntlMessages id="document.title.request.in.role" />{` `}
										<span className="owner-most-viewed-documents">{role}</span>
									</p>
									<p className="user-description">
										<IntlMessages id="document.request.cree.date" />{` `}
										<span className="owner-most-viewed-documents">{expiresAt}</span>
									</p>

									<FormControl>
										<FormLabel color="primary" ><IntlMessages id="document.request.cree" /></FormLabel>
										<RadioGroup value={String(value)} onChange={handleChange}>
											<FormControlLabel value="true" control={<Radio color="primary" />} label={<IntlMessages id="document.flow.approv.yes" />} />
											<FormControlLabel value="false" control={<Radio color="primary" />} label={<IntlMessages id="document.flow.approv.no" />} />
										</RadioGroup>
									</FormControl>

									<Divider className="mt-3 mb-3" />


									<Divider className="mt-3 mb-3" />
									<Grid container
										className="mt-3 mb-3"
									>
										<Grid item md={2}>
											<Button
												variant="text"
												color="primary"
												size="large"
												onClick={handleBackGo}
											>
												<KeyboardBackspaceIcon color="primary" style={{ marginRight: 10 }} />
												<IntlMessages id="dashboard.button.back" />
											</Button>
										</Grid>
										<Grid item xs>
											<Grid
												container
												justify="flex-end"
												alignItems="flex-end"
												spacing={2}
											>

												<Button
													style={{
														fontFamily: "Poppins", fontSize: '12px', fontWeight: 500, border: "none", boxShadow: "none", height: '45px', width: '120px'
													}}
													onClick={handleAcceptTask}
													variant="contained"
													color="primary">
													<IntlMessages id="tasks.table.column8" />
												</Button>

											</Grid>
										</Grid>
									</Grid>
								</TabPanel>
								<TabPanel value={value1} index={1}>

									<Grid container >
										<Grid item xs={2}>
											<h3><IntlMessages id="document.flow.comentary.task" /></h3>
										</Grid>

									</Grid>

									<Grid container item xs={12}>
										<Grid item xs={10} >
											<TextField
												name="comment"
												label={<IntlMessages id="document.flow.comentary.writer" />}
												multiline
												rows={3}
												onChange={handleChangeRedux}
											/>
										</Grid>
										<Grid item xs={1} >
											<IconButton
												style={{ background: isEmpty(commentCreate) ? "#E0E0E0" : "#3699FF", width: 35, height: 35, marginLeft: 15, marginTop: 25 }}
												disabled={isEmpty(commentCreate)}
												onClick={handleSubmit}>
												<NearMeOutlinedIcon style={{ color: "white", fontSize: 22 }} />
											</IconButton>
										</Grid>
									</Grid>
									<Grid container className="mt-1">
										<label >

											<AttachFileOutlinedIcon fontSize="small" color="primary" />

											<span style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, color: "#3699FF", marginTop: 13, cursor: 'pointer' }}>{file ? '' : <IntlMessages id="comment.attachment.title" />}</span>
											<input
												className={classes.input}
												type="file"
												onChange={handleChangeFile}

											/>
										</label>

										<span style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, color: "#3699FF", marginTop: 13 }}>{file ? <>{name}<ClearIcon fontSize="small" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={handleClear} /></> : ''}</span>


									</Grid>
									<CommentRole />
								</TabPanel>

							</div>

						</div>
					</div>
				</div>
			</div>
		</div>

	)
}

export default ManageCree;