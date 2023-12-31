import { Divider, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';

import { startActiveTasksInit, startDataCreeInit, startDataCreeLoading, startInvolvedLoading, typeInitCree } from 'actions/flowDocument';
import TableActionButton from 'components/search/ui/TableActionButton';
import { INBOX_STATUS, STATUS } from 'constants/constUtil';
import IntlMessages from 'util/IntlMessages';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import ManagementSummary from './ManagementSummary';
import TableActionButtonCree from 'components/search/ui/TableActionButtonCree';

const useStyles = makeStyles((theme) => ({

	iconos: {
		cursor: "pointer",
		color: "#2196f3",
		fontSize: '18px',
	},
	iconsHolder: {
		display: "flex",
		justifyContent: "center",
	},
	formControl: {
		width: "100%",
	},
	iconosCCB: {
		cursor: "pointer",
		color: "#FFA800",
		fontSize: '18px',
	},
}));

const Tasks = () => {

	const classes = useStyles();

	const isMounted = useRef(true);

	const history = useHistory();
	const dispatch = useDispatch();

	const { authUser } = useSelector(state => state.auth);
	const { tasksList = {} } = useSelector(state => state.flowDocument);
	const { data = [], totalItems = 0 } = tasksList;
	const [page, setPage] = useState(0)
	const { flowId } = useParams();

	const renderData = flowId ? data.filter(({ instanceId }) => instanceId === parseInt(flowId)) : data;

	const handleManage = (instanceId, taskId, role, author, fileId, expiresAt, type) => {
		dispatch(startInvolvedLoading(authUser, instanceId, taskId, role, author, fileId, expiresAt, type))
		history.push(`/manage`);

	};

	const handleManageCCB = (instanceId, taskId, role, author, fileId, expiresAt, type) => {
		dispatch(startDataCreeInit(authUser, instanceId, taskId, role, author, fileId, expiresAt, type))
		history.push(`/CREE`);

	};

	const handleManageSub = (instanceId, taskId, role, author, fileId, expiresAt, type) => {
		dispatch(startDataCreeInit(authUser, instanceId, taskId, role, author, fileId, expiresAt, type))
		history.push(`/manage`);

	};

	{/*{const handleOnChange = ({ target }) => {
		const { name, value} = target;
	
		dispatch(startActiveTasksInit(authUser , page, value));
	
	}*/}

	const handleEdit = (fileId, instanceId, type, taskId) => {
		dispatch(typeInitCree(type, taskId))
		history.push(`/document/${fileId}/edit/${instanceId}`);
	}

	const handleChangePage = (event, page) => {
		dispatch(startActiveTasksInit(authUser, page, STATUS))
		setPage(page);

	}

	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				{/*<Grid item xs={3}>
              <FormControl size="small" variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Estado</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="currentstatus"
                  //onChange={handleOnChange}
                  label="Estado"
                >
                 
				 {INBOX_STATUS.map((sta) => {
                  return(
				  <MenuItem value={sta}>{sta}</MenuItem>)
                 
                  })}
                </Select>
              </FormControl>
            </Grid>

             <Divider className='mt-3 mb-3'/> */}

				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="tasks.table.column1" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="tasks.table.column2" />
								</TableCell>

								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="tasks.table.column3" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="tasks.table.column9" />
								</TableCell>

								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="tasks.table.column4" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="tasks.table.column5" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="tasks.table.column6" />
								</TableCell>
								<TableCell align="center" style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="tasks.table.column7" />
								</TableCell>

								<TableCell align="center" className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'center' }} >
									<IntlMessages id="tasks.table.column8" />
								</TableCell>
								<TableCell align="center" className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'center' }} >
									<IntlMessages id="document.flow.cree" />
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody >

							{renderData.map(({ fileName, role, status, createdOn, author, instanceId, taskId, fileId, expiresAt, type, hasParent }, index) => {

								return <TableRow key={index} >

									<TableCell style={{ fontFamily: "Poppins", fontSize: "13px" }}>
										{fileName}
									</TableCell>
									<TableCell style={{ fontFamily: "Poppins", textAlign: "center", fontSize: "13px" }}>
										{role}
									</TableCell>
									<TableCell style={{ fontFamily: "Poppins", textAlign: "center", fontSize: "13px" }}>
										{status}
									</TableCell>
									<TableCell style={{ fontFamily: "Poppins", textAlign: "center", fontSize: "13px" }}>
										{instanceId}
									</TableCell>
									<TableCell style={{ fontFamily: "Poppins", textAlign: "center", fontSize: "13px" }}>
										{createdOn.substr(0, 10)}
									</TableCell>
									<TableCell style={{ fontFamily: "Poppins", textAlign: "center", fontSize: "13px" }}>
										{taskId}
									</TableCell>
									<TableCell style={{ fontFamily: "Poppins", textAlign: "center", fontSize: "13px" }}>
										{author}
									</TableCell>
									<TableCell style={{ fontFamily: "Poppins", textAlign: "center", fontSize: "13px" }}>
										{expiresAt && expiresAt.substr(0, 10)}
									</TableCell>
									<TableCell style={{ fontFamily: "Poppins", textAlign: "center", fontSize: "13px" }}>
										{type}
									</TableCell>
									<TableCell style={{ fontFamily: "Poppins", textAlign: "center" }}>

										<div className={classes.iconsHolder}>
											{type === "GENERAL" &&
												<TableActionButton
													materialIcon={
														<DescriptionOutlinedIcon
															className={classes.iconos}
															onClick={() => handleManage(instanceId, taskId, role, author, fileId, expiresAt, type)}
														/>
													}
												/>}
											{type === "CRE" && role !== "autor" &&  hasParent !== "YES" &&
												<TableActionButtonCree
													materialIcon={
														<DescriptionOutlinedIcon
															className={classes.iconosCCB}
															onClick={() => handleManageCCB(instanceId, taskId, role, author, fileId, expiresAt, type)}
														/>
													}
												/>
											}
											{type === "CRE" && role === "autor" && 
												<TableActionButtonCree
													materialIcon={
														<Tooltip color="primary" title={<IntlMessages id="table.shared.dialog.tooltip.edit" />}>
															<DescriptionOutlinedIcon
																className={classes.iconosCCB}
																onClick={() => handleEdit(fileId, instanceId, type, taskId)}
															/>
														</Tooltip>
													}
												/>
											}
											{type === "CRE" && role !== "autor" && hasParent === "YES" &&
												<TableActionButtonCree
													materialIcon={
														<DescriptionOutlinedIcon
															className={classes.iconosCCB}
															onClick={() =>  handleManageSub(instanceId, taskId, role, author, fileId, expiresAt, type)}
														/>
													}
												/>
											}

										</div>





									</TableCell>

								</TableRow>
							})}


							{!data || data.length == 0 &&
								<TableRow>
									<TableCell
										style={{ fontFamily: "Poppins", fontSize: '13px', fontWeight: 400, height: 50 }}
										colSpan='5'
									>
										<IntlMessages id="document.management.NotTasks" />
									</TableCell>
								</TableRow>

							}

						</TableBody>
					</Table>
				</TableContainer>
				<Grid className="mt-3 mb-3 mr-3"
					container
					justify="flex-end"
					alignItems="flex-end"

				>
					<Pagination
						style={{ color: '#369bff' }}
						count={Math.ceil(totalItems / 10)}
						color="primary"
						shape="rounded"
						total={totalItems}
						onChange={handleChangePage}
					/>
				</Grid>
			</div>
		</div>
	)
}

export { Tasks }