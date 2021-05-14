import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Button, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import queryString from 'query-string';
import { useHistory, useLocation , useParams} from 'react-router-dom';
import moment from 'moment';

import { TitleCard } from 'components/ui/helpers/TitleCard';
import { FormInit } from './ui/FormInit';
import IntlMessages from 'util/IntlMessages';
import { DetailDocumentType } from './ui/DetailDocumentType';
import { DropZoneDocument } from './ui/DropZoneDocument';
import {
	documentsClear,
	startDocumentByIdLoading,
	startEditDocumentLoading,
	startSaveFormLoading,
	startThumbnailLoading,
	startFoldersLoading,
	clearFolderIdOrigin
} from 'actions/documents';
import { Versioning } from './ui/Versioning';
import { DATE, FORMAT_YYYY_MM_DD, VERSION_TYPE_MAJOR } from 'constants/constUtil';
import { DocumentContext } from './helpers/DocumentContext';
import { SelectTags } from './ui/SelectTags';
import { SelectFolder } from './ui/SelectFolder';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { SelectFolderDialog } from './ui/SelectFolderDialog';
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { saveFileIdLoaded } from '../../actions/documents'

const useStyles = makeStyles((theme) => ({
	buttons: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const EditUpload = () => {

	const classes = useStyles();
	const { id } = useParams()
	const [openModal, setOpenModal] = useState(false);
	const { authUser } = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
	const {
		detailDocumentType = [],
		fileIdLoaded = '',
		folderName = '',
		path = '',
		folderIdOrigin = '',
		pathFolderName = '',
		folderId = '',
		versioningType = '',
		versioningComments = '',
		tagsSelected = [],
	} = useSelector(state => state.documents);

	const { id: documentId = '', aspectList = [] } = detailDocumentType;

	// ID DOCUMENTO URL
	const document = id;
	

	const [files, setFiles] = useState(null);

	const [directorio, setDirectorio] = useState(false)



	useEffect(() => {

		dispatch(documentsClear());

		if (document.length === 0) {
			return;
		}

		dispatch(startDocumentByIdLoading(document));

		dispatch(startThumbnailLoading(document));

		dispatch(startFoldersLoading(authUser))

	

	}, [dispatch, document]);

	useEffect(() => {
		if(files){
			dispatch(saveFileIdLoaded(
				{
					fileIdLoaded,
					thumbnailGenerated: false,
					name: files[0]?.name,
				}))
		}
	}, [files])

	const handleSaveForm = async () => {
		const resp = await Swal.fire({
			title: 'Edición documento',
			text: "¿Está seguro de editar este archivo?",
			icon: "question",
			showCancelButton: true,
			focusConfirm: true,
			heightAuto: false,
		});

		if (resp.value) {

			let filters = [];

			// FILTROS DE LOS CAMPOS QUE TIENEN VALOR
			for (const aspect of aspectList) {

				const existsWithValue = aspect.customPropertyList
					.filter(property => {

						if (property.value) {

							if (property.type === DATE) {

								property.value = moment(property.value).format(FORMAT_YYYY_MM_DD);

							}

							return property;
						}

					});

				if (existsWithValue.length > 0) {

					filters = [
						...filters,
						{
							...aspect,
							customPropertyList: existsWithValue,
						}
					];
				}

			}

			// TODO: se filtran por el nombre del tag. Requiere ajuste back
			const tags = tagsSelected.map(({ tag }) => {

				return tag

			});

			if (document.length > 0) {

				dispatch(
					startEditDocumentLoading(
						folderId,
						files,
						fileIdLoaded,
						versioningType === VERSION_TYPE_MAJOR ? true : false,
						versioningComments,
						{ id: documentId, aspectList: filters },
						tags
					)
				);
				setTimeout(() => {

					history.goBack();

				}, 1000);

			}
		}

	}

	const handleClear = () => {
		dispatch(documentsClear());
	}

	const clearPath = () => {
		setDirectorio(false)
		dispatch(clearFolderIdOrigin(folderIdOrigin))
	}

	useEffect(() => {
		if (pathFolderName != path && pathFolderName) {
			setDirectorio(true)
		}
		else {
			setDirectorio(false)
		}

	}, [pathFolderName, path])

	

	const Directory = () => {
		if (directorio) {
			return <>
				<div style={{ display: 'flex', height: 38 }}>
					<h4 style={{ marginTop: 10 }}>Directorio Nuevo</h4>
				</div>

				<p>{pathFolderName}
					<BackspaceSharpIcon
					    color="primary"
						onClick={clearPath}
						style={{ marginLeft: 20 }}
					/>
				</p>
			</>

		}
		else {
			return <><div style={{display:'flex', height:38}}>
				<h4 style={{marginTop:10}}>Directorio Actual</h4>
				<Fab 
				onClick={() => setOpenModal(!openModal)}
				color="primary" style={{ width: 35, height: 35, marginLeft: 70 }}>
					<EditIcon
						style={{ width: 15, height: 15 }}
						value={folderName} />
				</Fab>
			</div>
				<p> {path} </p></>
		}
	}


	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">
							<TitleCard message="Edición Documento" />
						</div>
					</div>

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">
							<Directory />
						</div>
						<div className="col-xl-4 col-lg-12 col-md-12 col-12 mt-3">


							<SelectFolderDialog
								setOpenModal={setOpenModal}
								openModal={openModal}
							/>
						</div>
					</div>



					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">
							<Divider />
						</div>
					</div>

						<DropZoneDocument document={document} setFiles={setFiles} />

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">

							<Divider />
						</div>
					</div>

					<DetailDocumentType />


					<Versioning />


					<SelectTags />

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">
							<Grid
								container
								justify="flex-end"
								alignItems="flex-end"
								spacing={2}
							>
								<div className={classes.buttons}>
									<Button
										style={{
											backgroundColor: '#E1F0FF', color: '#3699FF', fontFamily: "Poppins", fontSize: '12px', fontWeight: 600, border: "none",
											boxShadow: "none", height: '45px', width: '120px'}}
										type="button"
										variant="contained"
										onClick={handleClear}
									>
										<IntlMessages id="dashboard.advancedSearchClear" />
									</Button>

									<Button
										style={{
											fontFamily: "Poppins", fontSize: '12px', fontWeight: 600, border: "none",
											boxShadow: "none", height: '45px', width: '120px'
										}}
										disabled={
											detailDocumentType.length === 0 ||
											documentId.length === 0 ||
											aspectList.length === 0 ||
											fileIdLoaded.length === 0 ||
											folderId.length === 0 
											// (document.length > 0
											// 	&&
											// 	files && files.length > 0
											// 	// &&
											// 	// (
											// 	// 	versioningType.length === 0 ||
											// 	// 	versioningComments.length === 0
											// 	// )
											// )
										}
										type="submit"
										variant="contained"
										color="primary"
										onClick={handleSaveForm}
									>
										<IntlMessages id="document.loadDocuments.edit" />
									</Button>
								</div>
							</Grid>

						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditUpload;