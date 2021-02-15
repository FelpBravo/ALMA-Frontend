import React, { useEffect } from 'react';
import IntlMessages from 'util/IntlMessages';
import LabelIcon from '@material-ui/icons/Label';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Link from '@material-ui/core/Link';
import { useDispatch, useSelector } from 'react-redux';
import {
	saveTagsLoaded, startTagsInitLoading, openModalTags, startDeleteTagsLoading,
	setTagsList, setActionModalTags
} from 'actions/tags';
import ModalTags from './ui/ModalTags';
import { Avatar, Divider, Table } from '@material-ui/core';
import Swal from 'sweetalert2';
import { ACTION_CREATE, ACTION_EDIT } from 'constants/constUtil';
import SkeletonApp from 'components/ui/SkeletonApp';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: 30,
	},
	demo: {
		width: '100%',
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
					text: "¿Está seguro que quiere eliminar la etiqueta?",
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

	
	console.log(ROLE_TAG_DELETE)
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
								<div className="d-flex flex-row mb-3">
									<h4 className="mb-0"> Listado actual de etiquetas</h4>
									{ ROLE_TAG_CREATE &&
									<Link  className="ml-5" component="button" variant="body2" onClick={() => handleSelectActionTags(1)}>
																		<AddIcon color='primary' />
																			Crear nueva etiqueta
									</Link>
									}
								</div>
								<div className="table-responsive-material">
									<Table className="default-table table-unbordered table table-sm table-hover" style={{width:"60%"}}>
									<thead className="table-head-sm th-border-b">
									<tr>
										<th>Nombre de etiquetas</th>
										<th>Acciones</th>
									</tr>
									</thead>
									<tbody>
									
									{
										tagslist.length > 0
										&&
									    tagslist.map((item) => {
										return <tr key={item.id}>
										<td>
											<div className="d-flex align-items-center">
											<LabelIcon style={{ color: item.hex }} />
											<div className="user-detail">
												<h5 className="user-name ml-3">{item.tag}</h5>
											</div>
											</div>
										</td>
										<td>
											<div className="pointer text-primary">
											<div>

												{ ROLE_TAG_UPDATE &&
													<i
													onClick={() => handleSelectActionTags(2, item.id, item.tag, item.hex)}
													className="far fa-edit cursor-pointer custom-link-dash mr-2"
													></i>
												}


												
												{ ROLE_TAG_DELETE &&
													<i
													onClick={() => handleSelectActionTags(3, item.id)}
													className="far fa-trash-alt cursor-pointer custom-link-dash"
													></i>
												}
												

											</div>

											</div>
										</td>
										</tr>
									})}
									</tbody>
									</Table>
								</div>	
						</div>
					</div>

				</div>
			</div>
			<ModalTags />
		</div>

	)
}

export default Tags;
