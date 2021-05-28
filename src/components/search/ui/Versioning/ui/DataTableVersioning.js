import React, { useEffect, useRef, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IntlMessages from 'util/IntlMessages';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { openModalVisibility, startDownloadDocument, startVersioningLoading } from '../../../../../actions/search'
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import TableActionButton from '../../../ui/TableActionButton';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import BeenhereRoundedIcon from '@material-ui/icons/BeenhereRounded';
import BeenhereOutlinedIcon from '@material-ui/icons/BeenhereOutlined';

import ShareIcon from '@material-ui/icons/Share';
import { makeStyles } from '@material-ui/core';
import { startDocumentByIdVisibility } from '../../../../../actions/documents';
import Swal from 'sweetalert2';
import CompareArrowsOutlinedIcon from '@material-ui/icons/CompareArrowsOutlined';

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
		marginBottom: '10px',
		marginTop: '10px',
		width: '100%',
	},
	textEllipsis: {
		maxWidth: 240,
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis'
	}
}));



const DataTableVersioning = () => {

	const classes = useStyles();

	const isMounted = useRef(true)
	const history = useHistory()
	const dispatch = useDispatch()

	const { authUser, authorities } = useSelector(state => state.auth);
	const { versioning = {}, documentId = '' } = useSelector(state => state.searchs)
	const { data = [], totalItems = 0 } = versioning


	const [page, setPage] = useState(0)

	const ROLE_FILE_DOWNLOAD = authorities.find(rol => rol === 'ROLE_FILE_DOWNLOAD')


	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	const handleChangePage = (event, page) => {
		dispatch(startVersioningLoading(authUser, page, documentId));
		setPage(page);
	};

	const handleVisibility = (id, name) => {
		dispatch(openModalVisibility());
		dispatch(startDocumentByIdVisibility(id, name));
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

	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">

				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="versioning.table.column1" />
								</TableCell>
								<TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'center' }} >
									<IntlMessages id="versioning.table.column4" />
								</TableCell>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="versioning.table.column2" />
								</TableCell>
								<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }} >
									<IntlMessages id="versioning.table.column3" />
								</TableCell>
								<TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'center' }} >
									<IntlMessages id="versioning.table.column5" />
								</TableCell>
								<TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'center' }} >
									<IntlMessages id="Acciones" />
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>

							{data.map(({ name, modifiedAt, modifiedByUser, version, comment, id }, index) => {
								return <TableRow key={index}>
									<TableCell>{name}</TableCell>
									<TableCell>{version}</TableCell>
									<TableCell>{new Date(modifiedAt).toLocaleString()}</TableCell>
									<TableCell>{modifiedByUser}</TableCell>
									<TableCell className={classes.textEllipsis}>{comment}</TableCell>
									<TableCell align="center">
										<Grid container alignItems="center" justify="center">

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
													<BeenhereOutlinedIcon
														className={classes.iconos}
													//onClick={() => handleFirm(id, name)}
													/>
												}
											/>
											<TableActionButton
												materialIcon={
													<BeenhereRoundedIcon
														className={classes.iconos}
													//onClick={() => handleFirm(id, name)}
													/>
												}
											/>

										</Grid>
									</TableCell>
								</TableRow>

							})

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
						onChange={handleChangePage} />
				</Grid>

			</div>
		</div>
	)
}

export { DataTableVersioning }
