import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Divider, Fab, Grid, Paper, Step, StepLabel, Stepper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';
import EditIcon from '@material-ui/icons/Edit';
import { isEmpty } from 'lodash-es';
import get from 'lodash/get'
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import { clearFolderIdOrigin, documentsClear, saveFileIdLoaded, startDocumentByIdLoading, startEditDocumentLoading, startSaveFormLoading, startThumbnailLoading } from 'actions/documents';
import { TitleCard } from 'components/ui/helpers/TitleCard';
import IntlMessages from 'util/IntlMessages';

import { createModeSchema, editModeSchema } from './Documents.schema';
import { useFlowSteps } from './flow';
import UploadDocument from './steps/upload';
import { FormInit } from './ui/FormInit';
import { SelectFolderDialog } from './ui/SelectFolderDialog';

const useStyles = makeStyles((theme) => ({
	buttons: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	container: {
		padding: theme.spacing(3, 4)
	},
	buttonPrimary: {
		fontFamily: "Poppins",
		fontSize: '12px',
		fontWeight: 600,
		border: "none",
		boxShadow: "none",
		height: '45px',
		width: '120px'
	}
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
	const history = useHistory()
	const dispatch = useDispatch();
	const { id } = useParams()

	const {
		detailDocumentType = [],
		fileIdLoaded = '',
		folderId = '',
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
		resolver: yupResolver(EDIT_MODE ? editModeSchema : createModeSchema),
	});
	const { handleSubmit, reset, watch } = methods
	const { id: documentId = '', aspectList = [] } = detailDocumentType;

	const [directorio, setDirectorio] = useState(false)
	const [openModal, setOpenModal] = useState(false);

	const [files, setFiles] = useState(null);
	const [
		flowSteps,
		Component,
		activeStep,
		setActiveStep] = useFlowSteps({ editMode: EDIT_MODE, setFiles, document, files })

	const controlledDocument = watch('controlled_document', false);

	console.log("flowSteps", flowSteps, "Component", Component, "activeStep", activeStep)

	const disabledSubmit = (documentsList.length === 0 ||
		detailDocumentType.length === 0 ||
		documentId.length === 0 ||
		aspectList.length === 0 ||
		folderId.length === 0)

	const handleClear = () => {
		dispatch(documentsClear());
		reset(defaultValues)
	}

	useEffect(() => {
		const initialValues = getInitialValues(get(detailDocumentType, 'aspectList.0.customPropertyList', []))
		if (document && !isEmpty(initialValues)) {
			reset({ ...defaultValues, ...initialValues })
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



	const handleSaveForm = async (values) => {

		const resp = await Swal.fire({
			title: 'Carga de documento',
			text: "¿Estás seguro de realizar la carga de archivos?",
			icon: "question",
			showCancelButton: true,
			focusConfirm: true,
			heightAuto: false,
		});
		if (resp.value) {

			const newAspectList = [...(aspectList || [])]
			for (const aspect of newAspectList) {
				aspect.customPropertyList = aspect.customPropertyList.filter(property => {
					const value = get(values, property?.name, null)
					if (value) {
						property.value = value
						return property
					}
				})
			}

			const { tagsField } = values
			const filesId = documentsList.map(({ fileIdLoaded }) => fileIdLoaded)
			switch (true) {
				case controlledDocument: 
					setActiveStep(activeStep+1)
					break;
				case !EDIT_MODE:
					return dispatch(
						startSaveFormLoading(
							filesId,
							folderId,
							{ id: documentId, aspectList: newAspectList },
							tagsField,
							reset
						)
					);
				case EDIT_MODE:
					return dispatch(
						startEditDocumentLoading(
							folderId,
							files,
							fileIdLoaded,
							true, //values?.version === VERSION_TYPE_MAJOR ? true : false,
							values?.versioningComments,
							{ id: documentId, aspectList: newAspectList },
							tagsField,
							() => history.goBack() // CallBack
						)
					);
			
				default:
					break;
			}

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

	useEffect(() => {
		if (files) {
			dispatch(saveFileIdLoaded(
				{
					fileIdLoaded,
					thumbnailGenerated: false,
					name: files[0]?.name,
				}))
		}
	}, [files])

	return (<FormProvider {...methods} >
		<form onSubmit={handleSubmit(handleSaveForm)}>
			<Grid container spacing={2}>
				<Grid item md={12}>
					<Paper className={classes.container}>
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
					</Paper>
				</Grid>

				<Grid item md={12}>

					<Paper className={classes.container}>
						{
							controlledDocument && <>
								<Stepper alternativeLabel activeStep={activeStep}>
									{
										Object.keys(flowSteps).map((name, index) => <Step key={index}>
											<StepLabel>{name}</StepLabel>
										</Step>)
									}
								</Stepper>
								<Divider />
							</>
						}

						{Component}

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
											className={classes.buttonPrimary}
											disabled={disabledSubmit}
											type="submit"
											variant="contained"
											color="primary"
										>
											{

												controlledDocument
													? "Siguiente"
													: EDIT_MODE
														? <IntlMessages id="document.loadDocuments.submit.edit" />
														: <IntlMessages id="document.loadDocuments.load" />
											}
										</Button>

									</div>
								</Grid>

							</div>
						</div>
					</Paper>
				</Grid>
			</Grid>
		</form>
	</FormProvider>
	)
}

export default Documents;
