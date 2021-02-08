import React, { useEffect, useRef, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import queryString from 'query-string';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import FileSaver from 'file-saver';
import Paper from '@material-ui/core/Paper';
import { useHistory, useLocation } from 'react-router-dom';

import { columnsDocuments } from 'helpers/columnsDocuments';
import { DataTableHead } from './DataTableHead';
import { downloadDocument } from 'services/filesService';
import { startDeleteDocument, startSearchLoading, startSubscribeDocument, openModalVisibility } from 'actions/search';
import { MenuTable } from './MenuTable';
import { GENERAL_ERROR } from 'constants/constUtil';
import { MoreVert } from '@material-ui/icons';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import PlaylistAddCheckOutlinedIcon from '@material-ui/icons/PlaylistAddCheckOutlined';
import { makeStyles } from '@material-ui/core';
import TableActionButton from './TableActionButton';
import ModalVisibility from './ModalVisivility';
import { startDocumentByIdVisibility } from 'actions/documents';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';


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
	root: {
	  overflowX: "auto",
	  margin: "0 auto",
	  fontFamily: "Poppins",
	},
	pagination: {
		marginBottom:'10px',
		marginTop:'10px',
		width:'100%',
	  },
  }));

const DataTable = () => {

	const classes = useStyles();

	const { authUser } = useSelector(state => state.auth);

	const isMounted = useRef(true);

	const history = useHistory();

	const dispatch = useDispatch();
	const location = useLocation();

	const { documents = {}, fields = [], textSearch = '' } = useSelector(state => state.searchs);
	const { data = [], totalItems = 0 } = documents;
	const { filters } = fields;

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const { folderId } = queryString.parse(location.search);

	useEffect(() => {

		return () => {
			isMounted.current = false;
		}

	}, []);

	const handleVisibility=(id, name) =>{
    	dispatch(openModalVisibility());
		dispatch(startDocumentByIdVisibility(id, name));
	};

	const handleChangePage = (event, page) => {
		const existsFilters = filters.filter(filter => filter.value);

		dispatch(startSearchLoading(authUser, textSearch, existsFilters, folderId, page));

		setPage(page);

	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleDownload = async (id, name) => {
		try {

			Swal.fire({
				title: 'Downloading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const { data } = await downloadDocument(authUser, id);

			Swal.close();

			FileSaver.saveAs(data, name);

		} catch (error) {

			Swal.close();

			const message = error?.response?.data?.message ? error.response.data.message : GENERAL_ERROR;

			Swal.fire({
				title: 'Error', text: message, icon: 'error', heightAuto: false
			});

		}
	}

	const handleEdit = (id) => {
		history.push(`/documents?document=${id}`);
	}

	const handleDelete = async (id) => {
		const resp = await Swal.fire({
			title: 'Delete',
			text: "¿Está seguro de continuar?",
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
	
	return (
		<Paper style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}>
			<div className="flex-auto">
				<div className="table-responsive-material">
					<Table className="">
						<DataTableHead
							columns={columnsDocuments}
						/>
						<TableBody >
							{data.map((
								{   id,
									name,
									createdAt,
									modifiedAt,
									tags = [],
									version,
									isFavorite,
									createdByUser
								}) => {
								return (
									<TableRow
										hover
										tabIndex={-1}
										key={id}
									>
										<TableCell style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}>
											<i className="far fa-file-pdf custom-link-dash"></i>{` `}
											<span className="custom-link-dash">{name}</span>
										</TableCell>
										<TableCell style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}>{`${createdByUser}`}</TableCell>
										<TableCell style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}>{createdAt.substr(0,10)}</TableCell>
										<TableCell style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}>{modifiedAt.substr(0,10)}</TableCell>
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
										<TableCell style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}>{version}</TableCell>
										<TableCell></TableCell>
										<TableCell>
											<div className={classes.iconsHolder}>
											<TableActionButton
													materialIcon={
													<VisibilityOutlinedIcon
														className={classes.iconos}
														onClick={() => handleVisibility(id, name)}
													/>
													}
												/>
												<TableActionButton
													materialIcon={
													<SaveAltOutlinedIcon
														className={classes.iconos}
														onClick={() => handleDownload(id, name)}
													/>
													}
												/>
												<TableActionButton
													materialIcon={
													<BorderColorOutlinedIcon
														className={classes.iconos}
														onClick={() => handleEdit(id)}
													/>
													}
												/>
												<TableActionButton
													materialIcon={
													<DeleteOutlinedIcon
														className={classes.iconos}
														onClick={() => handleDelete(id)}
													/>
													}
												/>
												{/*<TableActionButton
													materialIcon={
													<PlaylistAddCheckOutlinedIcon
														className={classes.iconos}
														onClick={() => handleSubscribe(id)}
													/>
													}
												/>*/}
												<MoreVert
													className={classes.iconos}
													onClick={() => console.log("test")}
												/>
												</div>
											</TableCell>
										{/*<TableCell>

											<div className="custom-td-table">
												<i
													title='Download'
													onClick={() => handleDownload(id, name)}
													className="fa fa-download cursor-pointer custom-link-dash"
												></i>
												<i
													title="Edit"
													onClick={() => handleEdit(id)}
													className="far fa-edit cursor-pointer custom-link-dash"
												></i>
												<i
													title="Remove"
													onClick={() => handleDelete(id)}
													className="far fa-trash-alt cursor-pointer custom-link-dash"
												></i>
												<i
													title={isFavorite ? 'Desuscribir' : 'Suscribir'}
													onClick={() => handleSubscribe(id)}
													className="far fa-hand-pointer cursor-pointer custom-link-dash"
												></i>

											</div>

										</TableCell>*/}

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
					<Grid className="mt-3 mb-3 mr-3"
									container
									justify="flex-end"
									alignItems="flex-end"

								>
									<Pagination 
									style={{color: '#369bff'}}
									count={Math.ceil(totalItems/rowsPerPage)} 
									color="primary" 
									shape="rounded" 
									total={totalItems} 
									onChange={handleChangePage}/>
								</Grid>
				</div>
				<ModalVisibility/>
			</div>
		</Paper>
	);
};

export default DataTable;