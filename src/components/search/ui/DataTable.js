import { makeStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import { MoreVert } from '@material-ui/icons';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import ShareIcon from '@material-ui/icons/Share';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Pagination from '@material-ui/lab/Pagination';
import queryString from 'query-string';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import Swal from 'sweetalert2';

import { addBreadcrumbs } from 'actions/breadcrumbs'
import { informationRemoveAll } from 'actions/information'
import { columnsDocuments } from 'helpers/columnsDocuments';
import IntlMessages from 'util/IntlMessages';

import { startDocumentByIdVisibility } from '../../../actions/documents';
import { openModalFirm, startDeleteDocument, startDownloadDocument, startSearchLoading, startSubscribeDocument } from '../../../actions/search';
import { DataTableHead } from './DataTableHead';
import ModalEditOnline from './ModalEditOnline';
import SharedDialog from './SharedDialog';
import TableActionButton from './TableActionButton';
import ModalVersioning from './Versioning/ui/ModalVersioning';
import TableActionButtonCree from './TableActionButtonCree';
import { starDocumentCreeInit, startApprovesListLoading } from 'actions/flowDocument';

const MAX_CHARACTERS = 60;

const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5',
	},
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));

const StyledMenuItem = withStyles((theme) => ({
	root: {
		'&:focus': {
			backgroundColor: theme.palette.primary.main,
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white,
			},
		},
	},
}))(MenuItem);


const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 650,
	},
	margin: {
		margin: theme.spacing(1),
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
	iconsHolder: {
		display: "flex",
		alignItems: "center",
	},
	iconos: {
		cursor: "pointer",
		color: "#2196f3",
		fontSize: '18px',
	},
	iconosCCB: {
		cursor: "pointer",
		color: "#FFA800",
		fontSize: '18px',
	},
	root: {
		overflowX: "auto",
		margin: "0 auto",
		fontFamily: "Poppins",
	},
	pagination: {
		marginBottom: '10px',
		marginTop: '10px',
		width: '100%',
	},
	menu: {
		fontFamily: "Poppins",
		fontSize: 12,
		fontWeight: 400,
	}
}));


const DataTable = () => {

	const [anchorEl, setAnchorEl] = React.useState(null);

	const classes = useStyles();

	const { authUser, authorities } = useSelector(state => state.auth);

	const isMounted = useRef(true);

	const history = useHistory();

	const dispatch = useDispatch();

	const location = useLocation();

	const { documents = {}, fields = [], textSearch = '' } = useSelector(state => state.searchs);

	const { data = [], totalItems = 0 } = documents;

	const { filters } = fields;

	const [rowsPerPage, setRowsPerPage] = useState(10);

	const { id, page } = useParams()

	const { path, url } = useRouteMatch();

	const [dataSharedDialog, setDataSharedDialog] = useState(null)

	const [editOnline, setEditOnline] = useState(null)

	const [selectedRow, setSelectedRow] = useState(null)

	const [editActive, setEditActive] = useState(false)

	const flowName = "CRE";

	let page_url = 1
	if (page) {
		page_url = page.trim() ? page.replace(/[a-zA-Z ]/g, '') : 1
	}

	const { folderId } = queryString.parse(location.search);

	const folderId2 = id ? id : folderId

	const ROLE_FILE_DOWNLOAD = authorities.find(rol => rol === 'ROLE_FILE_DOWNLOAD')

	const ROLE_FILE_UPDATE = authorities.find(rol => rol === 'ROLE_FILE_UPDATE')

	const ROLE_FILE_DELETE = authorities.find(rol => rol === 'ROLE_FILE_DELETE')

	const ROLE_FILE_PREVIEW = authorities.find(rol => rol === 'ROLE_FILE_PREVIEW')

	useEffect(() => {

		return () => {
			isMounted.current = false;
		}

	}, []);

	const handleVisibility = (id, name, permissions) => {
		dispatch(informationRemoveAll())
		dispatch(addBreadcrumbs(name, `/document/${id}/info`))
		history.push(
			{
				pathname: `/document/${id}/info`,
				state: { permissions: permissions }
			})
	};

	const handleFirm = (id, name) => {
		dispatch(openModalFirm());
		dispatch(startDocumentByIdVisibility(id, name));
	};

	const handleVersioning = (id, name) => {
		dispatch(addBreadcrumbs(name, `/document/${id}/version`))
		history.push(`/document/${id}/version`);

	};

	const handleChangePage = (event, page) => {
		if (path === '/search/:page' || path === '/search') {
			const existsFilters = filters.filter(filter => filter.value);
			history.replace(`/search/p${page}`)
			dispatch(startSearchLoading(authUser, textSearch, existsFilters, folderId2, page));
		}
		else {
			if (page === 1) {
				history.push(`/directory/${id}`);
			}
			else {
				history.push(`/directory/${id}/p${page}`);
			}

		}



	};


	const handleDownload = async (id, name) => {
		if (ROLE_FILE_DOWNLOAD) {
			const resp = await Swal.fire({
				title: 'Descargar',
				text: "¿Está seguro que quiere descargar el documento?",
				icon: "question",
				showCancelButton: true,
				focusConfirm: true,
				heightAuto: false,
			});
			if (resp.value) {
				dispatch(startDownloadDocument(id, name))
			}
		}

	}

	const handleEdit = (id) => {
		history.push(`/document/${id}/edit`);

	}
	const handleEditCCB = (id) => {
		dispatch(startApprovesListLoading( {authUser, flowName}))
		dispatch(starDocumentCreeInit({authUser, id}))
		history.push(`/document/${id}/CREE`);

	}
	

	const handleDelete = async (id) => {
		setAnchorEl(null)
		const resp = await Swal.fire({
			title: 'Eliminar',
			text: "¿Está seguro que quiere eliminar el documento?",
			icon: "question",
			showCancelButton: true,
			focusConfirm: true,
			heightAuto: false,
		});
		if (resp.value) {
			dispatch(startDeleteDocument(id));
		}
	}

	const handleSubscribe = (id) => {
		dispatch(startSubscribeDocument(id));
	}


	const handleClick = (e, id, name) => {
		setAnchorEl(e.currentTarget);
		setSelectedRow({ 'id': id, 'name': name })
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleOpenEditUsers = () => {
		//dispatch(startDocumentsOfficeLoading(authUser, selectedRow.id))
		setAnchorEl(null);
		setEditActive(true)
		
	}
	const handleCloseEditUsers = () =>{	
		setEditActive(false) 
	}

	const getName = name =>
		name.length <= MAX_CHARACTERS
			? <Typography variant="body2" color="primary">{name}</Typography>
			: <Tooltip
				title={name}
				aria-label={name}
				placement="bottom"

			>
				<Typography variant="body2" color="primary">{name?.slice(0, MAX_CHARACTERS)}...</Typography>
			</Tooltip>

	return (
		<div className="row mt-3">
			<SharedDialog handleClose={() => setDataSharedDialog(null)} data={dataSharedDialog} />
			<ModalEditOnline  data={selectedRow} close={handleCloseEditUsers} open={editActive} />
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">

				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">

						<DataTableHead
							columns={columnsDocuments}
						/>
						<TableBody >
							{data.map((
								{ id,
									name,
									createdAt,
									modifiedAt,
									tags = [],
									version,
									isFavorite,
									createdByUser,
									permissions = []
								}) => {
									const VIEW = permissions.find(rol => rol === 'VIEW')
									const EDIT = permissions.find(rol => rol === 'EDIT')
									const DELETE = permissions.find(rol => rol === 'DELETE')
									const UPDATE = permissions.find(rol => rol === 'UPDATE')
									const DOWNLOAD = permissions.find(rol => rol === 'DOWNLOAD')

								return (
									<TableRow
										hover
										tabIndex={-1}
										key={id}
									>
										<TableCell style={{ fontFamily: "Poppins", fontSize: '13px', fontWeight: 400, }}>
											<div style={{ display: 'flex' }}>
												<InsertDriveFileOutlinedIcon fontSize="small" color="primary" />
												{getName(name)}
											</div>
										</TableCell>
										<TableCell style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}>{`${createdByUser}`}</TableCell>
										<TableCell style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}>{createdAt.substr(0, 10)}</TableCell>
										<TableCell style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}>{modifiedAt.substr(0, 10)}</TableCell>
										<TableCell>
											{
												tags.length > 0
												&&
												tags.map((tag) => {
													return (
														<i
															key={tag.id}
															style={{ color: tag.hex, margin: 1 }}
															className="zmdi zmdi-circle jr-fs-xxs"
														/>
													)
												})
											}
										</TableCell>
										<TableCell style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}>
											{/*<Link
											onClick={() => handleVersioning(id, name)}
											component="button"
											variant="body2"
											>{version}</Link>*/}
											{version}
										</TableCell>
										<TableCell></TableCell>
										<TableCell>
											<div className={classes.iconsHolder}>
												{(ROLE_FILE_PREVIEW || VIEW) &&
													<TableActionButton
														materialIcon={
															<Tooltip color="primary" title={<IntlMessages id="table.shared.dialog.tooltip.preview" />}>
																<VisibilityOutlinedIcon
																	className={classes.iconos}
																	onClick={() => handleVisibility(id, name, permissions)}
																/>
															</Tooltip>
														}
													/>
												}

												{(ROLE_FILE_DOWNLOAD || DOWNLOAD) &&
													<TableActionButton
														materialIcon={
															<Tooltip color="primary" title={<IntlMessages id="table.shared.dialog.tooltip.upload" />}>
																<SaveAltOutlinedIcon
																	className={classes.iconos}
																	onClick={() => handleDownload(id, name)}
																/>
															</Tooltip>
														}
													/>
												}	

												{(ROLE_FILE_UPDATE || EDIT) &&
													<TableActionButton
														materialIcon={
															<Tooltip color="primary" title={<IntlMessages id="table.shared.dialog.tooltip.edit" />}>
																<BorderColorOutlinedIcon
																	className={classes.iconos}
																	onClick={() => handleEdit(id)}
																/>
															</Tooltip>
														}
													/>
												}

												{(ROLE_FILE_UPDATE || EDIT) && /*MOMENTANEAMENTE HASTA QUE SE CREEN LOS PERMISOS PARA EL 'CRE' */
													<TableActionButtonCree
														materialIcon={
															<Tooltip  title={<IntlMessages id="table.shared.dialog.tooltip.edit"/>}>
																<BorderColorOutlinedIcon
																	className={classes.iconosCCB}
																	onClick={() => handleEditCCB(id)}
																/>
															</Tooltip>
														}
													/>
												}
												{/*{(ROLE_FILE_DELETE || DELETE) &&
													<TableActionButton
														materialIcon={
															<DeleteOutlinedIcon
																className={classes.iconos}
																onClick={() => handleDelete(id)}
															/>
														}
													/>}
												 <TableActionButton
													materialIcon={
														<PlaylistAddCheckOutlinedIcon
															className={classes.iconos}
															onClick={() => handleSubscribe(id)}
														/>
													}
												/>
												<TableActionButton
													materialIcon={
														<FingerprintOutlinedIcon
															className={classes.iconos}
															onClick={() => handleFirm(id, name)}
														/>
													}
												/>
												<TableActionButton
													materialIcon={
														<Tooltip title={<IntlMessages id="table.shared.dialog.tooltip.title" />}>
															<ShareIcon
																className={classes.iconos}
																onClick={() => setDataSharedDialog({ id, name })}
															/>
														</Tooltip>
													}
												/> 
												<TableActionButton
													materialIcon={
														<RateReviewOutlinedIcon
															className={classes.iconos}
															onClick={() => setEditOnline({id, name})}
														/>
													}
												/>*/}
												<TableActionButton
													materialIcon={
														<Tooltip color="primary" title={<IntlMessages id="table.shared.dialog.tooltip.versioning" />}>
															<LoopOutlinedIcon
																className={classes.iconos}
																onClick={() => handleVersioning(id, name)}
															/>
														</Tooltip>
													}
												/>
												<MoreVert
													className={classes.iconos}
													onClick={(e) => handleClick(e, id, name)}
												/>
												<StyledMenu
													id="customized-menu"
													anchorEl={anchorEl}
													keepMounted
													open={Boolean(anchorEl)}
													onClose={handleClose}
												>

												{(ROLE_FILE_UPDATE || UPDATE) &&	
													<StyledMenuItem onClick={() => handleOpenEditUsers(selectedRow.id)}>
													        <RateReviewOutlinedIcon
																className={classes.iconos}	
															/>{` `}
													<span className={classes.menu}><IntlMessages id="table.shared.dialog.tooltip.editonline"/></span>	
													</StyledMenuItem>
												}

												{(ROLE_FILE_DELETE || DELETE) && 
													<StyledMenuItem onClick={() => handleDelete(selectedRow.id)} >
															<DeleteOutlinedIcon className={classes.iconos}/>
														<span className={classes.menu}><IntlMessages id="table.shared.dialog.tooltip.remove" /></span>
													</StyledMenuItem>
												}

													<StyledMenuItem onClick={() => setDataSharedDialog(selectedRow)} >
														<ShareIcon
															className={classes.iconos}
														/>{` `}
														<span className={classes.menu}><IntlMessages id="table.shared.dialog.tooltip.title" /></span>
													</StyledMenuItem>
												</StyledMenu>
											</div>
										</TableCell>

										{/*<TableCell>
											<MenuTable
												id={id}
												isFavorite={isFavorite}
											/>
										</TableCell>*/}

									</TableRow>
								);
							})}
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
						defaultPage={parseInt(page_url)}
						count={Math.ceil(totalItems / rowsPerPage)}
						color="primary"
						shape="rounded"
						total={totalItems}
						onChange={handleChangePage} />
				</Grid>
				{/* <ModalFirm/> */}
				<ModalVersioning />
			</div>
		</div>

	);
};

export default DataTable;