import React, { useEffect, useRef, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
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
import { startDeleteDocument, startSearchLoading, startSubscribeDocument } from 'actions/search';
import { MenuTable } from './MenuTable';
import { GENERAL_ERROR } from 'constants/constUtil';

const DataTable = () => {

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

	const handleChangePage = (event, page) => {

		const existsFilters = filters.filter(filter => filter.value);

		dispatch(startSearchLoading(authUser, textSearch, existsFilters, folderId, page + 1));

		setPage(page);

	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(event.target.value);
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
		<Paper  style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}>
			<div className="flex-auto">
				<div className="table-responsive-material">
					<Table className="">
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
										<TableCell style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}>{createdAt}</TableCell>
										<TableCell style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}>{modifiedAt}</TableCell>
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
						<TableFooter>
							<TableRow>
								<TablePagination
									count={totalItems}
									rowsPerPage={rowsPerPage}
									page={page}
									onChangePage={handleChangePage}
									onChangeRowsPerPage={handleChangeRowsPerPage}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</div>
		</Paper>
	);
};

export default DataTable;
