import React, { useEffect } from 'react';
import IntlMessages from 'util/IntlMessages';
import { makeStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Link from '@material-ui/core/Link';
import { useDispatch, useSelector } from 'react-redux';
import {
	saveTagsLoaded, startTagsInitLoading, openModalTags, startDeleteTagsLoading,
	setTagsList, setActionModalTags
} from 'actions/tags';
import ModalTags from './ui/ModalTags';
import {Table, TableCell, TableRow, TableContainer, Paper, TableHead, TableBody, Grid} from '@material-ui/core';
import Swal from 'sweetalert2';
import { ACTION_CREATE, ACTION_EDIT } from 'constants/constUtil';
import SkeletonApp from 'components/ui/SkeletonApp';
import TableActionButton from 'components/search/ui/TableActionButton';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import LabelIcon from '@material-ui/icons/Label';


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
}));

const Tags = () => {

	const dispatch = useDispatch();

	const { authUser, authorities } = useSelector(state => state.auth);

	const { tagslist = [], } = useSelector(state => state.tags);

	useEffect(() => {

		if (tagslist.length === 0) {
			dispatch(startTagsInitLoading(authUser));
		}

		dispatch(saveTagsLoaded());

	}, [dispatch]);

	const classes = useStyles();
	const [secondary, setSecondary] = React.useState(false);


	const handleSelectActionTags = async (type, id, tag, hex) => {

		switch (type) {
			case 1:

				dispatch(openModalTags());
				dispatch(setActionModalTags(ACTION_CREATE));
				dispatch(setTagsList({
					tag: '',
					hex: '',
					id: 0,
				}));

				break;

			case 2:

				dispatch(openModalTags());
				dispatch(setActionModalTags(ACTION_EDIT));
				dispatch(setTagsList({
					tag,
					hex,
					id,
				}));

				break;

			case 3:

				const resp = await Swal.fire({
					title: 'Eliminar',
					text: "¿Estas seguro que quiere eliminar la etiqueta?",
					icon: "question",
					showCancelButton: true,
					focusConfirm: true,
					heightAuto: false,
				});

				if (resp.value) {
					dispatch(startDeleteTagsLoading(id));
				}

				break;

			default:
				break;
		}

	}

	const ROLE_TAG_CREATE = authorities.find(rol=> rol === 'ROLE_TAG_CREATE')

	const ROLE_TAG_UPDATE = authorities.find(rol=> rol === 'ROLE_TAG_UPDATE') 

	const ROLE_TAG_DELETE = authorities.find(rol=> rol === 'ROLE_TAG_DELETE') 

	return (
	<div className="row">
		<div className="col-xl-12 col-lg-12 col-md-12 col-12">
			<div className="jr-card">

				<div className="row">
					<div className="col-xl-12 col-lg-12 col-md-12 col-12">

						<div className="jr-card-header d-flex align-items-center">
							<h3 className="mb-0">
								<IntlMessages id="tags.title" />
							</h3>
						</div>

						<div className="row mt-3">
							<div className="col-xl-12 col-lg-12 col-md-12 col-12">

								<Grid container spacing={2}>

										<Grid item xs={10}>
										<p className="mb-0"> Listado actual de etiquetas</p>
										</Grid>

										<Grid item xs={2}>
										{ ROLE_TAG_CREATE &&
											<Link component="button" variant="body2" onClick={() => handleSelectActionTags(1)}>
																				<AddIcon color='primary' />
																					Crear nueva etiqueta
											</Link>
										}
										</Grid>
								</Grid>
							</div>
						</div>

							<div className="row mt-3">
								<div className="col-xl-12 col-lg-12 col-md-12 col-12">

									<TableContainer component={Paper}>
										<Table size="small" aria-label="a dense table">
											<TableHead>
												<TableRow>
													<TableCell style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400  }} >
														<IntlMessages id="folders.table.column1" />
													</TableCell>
													<TableCell  style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'center'}} >
														<IntlMessages id="folders.table.column2" />
													</TableCell>
												</TableRow>
											</TableHead>

											<TableBody>
												{
														tagslist.length > 0
														&&
														tagslist.map((item) => {
															return<TableRow hover key={item.id}>
														<TableCell
															style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}
															component="th"
															scope="row"
															className="folders-table-row"
														>
															<LabelIcon className='mr-3' style={{ color: item.hex }} />
															{item.tag}
														</TableCell>
														
														<TableCell>
														<div className={classes.iconsHolder}>
														{ ROLE_TAG_UPDATE &&
																	<TableActionButton
																		materialIcon={
																		<BorderColorOutlinedIcon
																			className={classes.iconos}
																			onClick={() => handleSelectActionTags(2, item.id, item.tag, item.hex)}
																		/>
																		}
																	/>}
														{ ROLE_TAG_DELETE &&
																	<TableActionButton
																		materialIcon={
																		<DeleteOutlinedIcon
																			className={classes.iconos}
																			onClick={() => handleSelectActionTags(3, item.id)}
																		/>
																		}
																	/>}			
															</div>
														</TableCell>
													</TableRow>
													})}
											</TableBody>
										</Table>
									</TableContainer>

								</div>
	                        </div>
		                </div>
		            </div>
		        </div>
		    </div>
			<ModalTags/>
		</div>
		
	)
}

export default Tags;
