import { Button, Divider, Fab, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';
import EditIcon from '@material-ui/icons/Edit';
import { isEmpty } from 'lodash-es';
import get from 'lodash/get'
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { clearFolderIdOrigin, documentsClear, startDocumentByIdLoading, startEditDocumentLoading, startSaveFormLoading, startThumbnailLoading } from 'actions/documents';
import { TitleCard } from 'components/ui/helpers/TitleCard';
import { VERSION_TYPE_MAJOR } from 'constants/constUtil';
import IntlMessages from 'util/IntlMessages';

import { DocumentContext } from './helpers/DocumentContext';
import { DetailDocumentType } from './ui/DetailDocumentType';
import { DropZoneDocument } from './ui/DropZoneDocument';
import { FormInit } from './ui/FormInit';
import { SelectFolder } from './ui/SelectFolder';
import { SelectFolderDialog } from './ui/SelectFolderDialog';
import { Versioning } from './ui/Versioning';
import { SelectTags } from './ui/SelectTags';

const useStyles = makeStyles((theme) => ({
	buttons: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const getInitialValues = list => {
	const response = {}
	list.forEach(({ name, value }) => {
		if (value) response[name] = value;
	}
	)
	return response;
}

const defaultValues = {
	tagsField: [],
}

const Documents = () => {

	const classes = useStyles();

	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
	const { id } = useParams()
	console.log("id Document", id)

	const {
		detailDocumentType = [],
		fileIdLoaded = '',
		folderId = '',
		versioningType = '',
		versioningComments = '',
		path = '',
		pathFolderName = '',
		folderIdOrigin = '',
		folderName = '',
	} = useSelector(state => state.documents);
	const documentsList = useSelector(state => state.documents.filesLoaded)
	// ID DOCUMENTO URL
	const document = id || ""
	const EDIT_MODE = document.length !== 0
	const methods = useForm({
		mode: 'onTouched',
		// name: 'documentForm',
		defaultValues,
		// resolver: yupResolver(schema),
	});
	const { handleSubmit, register, control, formState: { errors }, reset } = methods

	const { id: documentId = '', aspectList = [] } = detailDocumentType;

	const [directorio, setDirectorio] = useState(false)
	const [openModal, setOpenModal] = useState(false);

	const [files, setFiles] = useState(null);
	const handleClear = () => {
		dispatch(documentsClear());
		reset(defaultValues)
	}

	useEffect(() => {
		const initialValues = getInitialValues(get(detailDocumentType, 'aspectList.0.customPropertyList', []))
		if (document && !isEmpty(initialValues)) {
			reset({ ...defaultValues,...initialValues})
		}
	}, [reset, detailDocumentType, document])

	useEffect(() => { // Cargar datos para editar

		dispatch(documentsClear());

		if (document.length === 0) {
			return;
		}

		dispatch(startDocumentByIdLoading(document));

		dispatch(startThumbnailLoading(document));
		return () => handleClear();
	}, [dispatch, document]);



	const handleSaveForm = values => {
		console.log("values", values, "aspectList", aspectList)

		// const resp = await Swal.fire({
		// 	title: 'Carga de documento',
		// 	text: "¿Estás seguro de realizar la carga de archivos?",
		// 	icon: "question",
		// 	showCancelButton: true,
		// 	focusConfirm: true,
		// 	heightAuto: false,
		// });

		const newAspectList = aspectList
		for (const aspect of newAspectList) {
			aspect.customPropertyList = aspect.customPropertyList.filter(property => {
				const value = get(values, property?.name, null)
				if (value) {
					property.value = value
					return property
				}
			})
		}
		console.log("newAspectList", newAspectList)

		const { tagsField } = values
		const filesId = documentsList.map(({ fileIdLoaded }) => fileIdLoaded)

		if (document.length === 0) { // TODO Create mode 
			dispatch(
				startSaveFormLoading(
					filesId,
					folderId,
					{ id: documentId, aspectList: newAspectList },
					tagsField,
					reset
				)
			);
		}
		else { // Edition mode
			alert(JSON.stringify(values))
			dispatch(
				startEditDocumentLoading(
					folderId,
					files,
					fileIdLoaded,
					values?.version === VERSION_TYPE_MAJOR ? true : false,
					values?.versioningComments,
					{ id: documentId, aspectList: newAspectList },
					tagsField
				)
				
			);
			// setTimeout(() => {

			// 	history.goBack();

			// }, 1000);

		}

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
					<IntlMessages id="document.title.newDirectory" />
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
		return <>
			<div style={{ display: 'flex', height: 38 }}>
				<h4 style={{ marginTop: 10 }}>
					<IntlMessages id="document.title.currentDirectory" />
				</h4>
				<Fab
					onClick={() => setOpenModal(!openModal)}
					color="primary" style={{ width: 35, height: 35, marginLeft: 70 }}>
					<EditIcon
						style={{ width: 15, height: 15 }}
						value={folderName} />
				</Fab>
			</div>
			<p> {path} </p>
		</>
	}


	return (
		<div className="row">
			<button onClick={() => reset(defaultValues)}>Reset</button>
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">
					<FormProvider {...methods} >
						<form onSubmit={handleSubmit(handleSaveForm)}>
							<div className="row">
								<div className="col-xl-12 col-lg-12 col-md-12 col-12">
									{
										EDIT_MODE
											? <TitleCard message="document.title.editDocument" />
											: <TitleCard message="document.loadDocuments" />

									}
								</div>
							</div>

							{
								!EDIT_MODE
								&&
								<FormInit />
							}

							{/* {
								!EDIT_MODE
								&&
								<div className="row">
									<div className="col-xl-4 col-lg-12 col-md-12 col-12 mt-3">
										<SelectFolder />
									</div>
								</div>
							} */}
							{EDIT_MODE
								&&
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
							}


							<div className="row">
								<div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">
									<Divider />
								</div>
							</div>

							<DocumentContext.Provider value={{ setFiles }}>
								<DropZoneDocument document={document} setFiles={setFiles} />
							</DocumentContext.Provider>

							<div className="row">
								<div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">

									<Divider />
								</div>
							</div>

							<DetailDocumentType />

							{
								EDIT_MODE &&
								<Versioning />
							}

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
													boxShadow: "none", height: '45px', width: '120px'
												}}
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
												// disabled={documentsList.length === 0 ||
												// 	detailDocumentType.length === 0 ||
												// 	documentId.length === 0 ||
												// 	aspectList.length === 0 ||
												// 	folderId.length === 0
												// }
												type="submit"
												variant="contained"
												color="primary"
											//onClick={handleSaveForm}
											>
												<IntlMessages id="document.loadDocuments.load" />
											</Button>
										</div>
									</Grid>

								</div>
							</div>
						</form>
					</FormProvider>
				</div>
			</div>
		</div>
	)
}

export default Documents;
