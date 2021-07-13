import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Divider, Grid, Paper, Step, StepLabel, Stepper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { RestorePageOutlined } from '@material-ui/icons';
import { isEmpty } from 'lodash-es';
import get from 'lodash/get'
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { object } from 'yup';

import { documentsClear, saveFileIdLoaded, saveFormFinish, startEditDocumentLoading, startEditFlowDocumentLoading, startSaveFormFlowLoading, startSaveFormLoading } from 'actions/documents';
import { FORMAT_YYYY_MM_DD } from 'constants/constUtil';
import IntlMessages from 'util/IntlMessages';

import { createModeSchema, editModeSchema } from './Documents.schema';
import { useFlowSteps } from './flow';
import { FlowContext } from './helpers/FlowContext';

const useStyles = makeStyles((theme) => ({
	buttons: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	container: {
		width: '100%',
		padding: theme.spacing(3, 4)
	},
	margin: {
		marginBottom: theme.spacing(3)
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
	const { id, flowId } = useParams()
	const {
		detailDocumentType = [],
		fileIdLoaded = '',
		folderId = '',
	} = useSelector(state => state.documents);
	const documentsList = useSelector(state => state.documents.filesLoaded)
	// ID DOCUMENTO URL
	const document = id || ""
	const EDIT_MODE = (Boolean(flowId) || document.length !== 0)
	const [resolver, setResolver] = useState(EDIT_MODE ? editModeSchema : createModeSchema)

	const methods = useForm({
		mode: 'onTouched',
		name: 'documentForms',
		defaultValues,
		resolver: yupResolver(object().shape(resolver)),
	});
	const { handleSubmit, reset, watch, formState: { errors } } = methods
	const { id: documentId = '', aspectList = [] } = detailDocumentType;
	const [files, setFiles] = useState(null);

	const handleClear = () => {
		dispatch(documentsClear());
		reset(defaultValues)
	}

	const controlledDocument = watch('controlled_document', false);

	useEffect(() => {
		const initialValues = getInitialValues(get(detailDocumentType, 'aspectList.0.customPropertyList', []))
		if (document && !isEmpty(initialValues)) {
			reset({ ...defaultValues, ...initialValues })
		}
	}, [reset, detailDocumentType, document])

	const disabledSubmit = (documentsList.length === 0 ||
		detailDocumentType.length === 0 ||
		documentId.length === 0 ||
		aspectList.length === 0 ||
		!isEmpty(errors) ||
		folderId.length === 0)

	const nextStep = () => setActiveStep(activeStep => activeStep + 1)

	const handleSaveForm = async (values) => {

		const resp = await Swal.fire({
			title: 'Carga de documento',
			text: "¿Estás seguro de realizar la carga de archivos?",
			icon: "question",
			focusConfirm: true,
			heightAuto: false,
			showCancelButton: true,
		});
		if (resp.value) {

			const newAspectList = aspectList.map(aspect => ({
				...aspect,
				customPropertyList: aspect.customPropertyList.filter(property => {
					const value = get(values, property?.name, null)
					if (value) {
						property.value = property.type === "DATE" ? moment(value).format(FORMAT_YYYY_MM_DD) : value
						return property
					}
				})
			})
			)

			const { tagsField } = values
			setOtherProps({ tagsField })
			const filesId = documentsList.map(({ fileIdLoaded }) => fileIdLoaded)
			switch (true) {

				case controlledDocument:
					const callback = () => setActiveStep(activeStep + 1)
					return dispatch(
						startSaveFormFlowLoading(
							filesId,
							folderId,
							{ id: documentId, aspectList: newAspectList },
							tagsField,
							reset,
							callback
						)
					);

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
				case flowId && EDIT_MODE:
					return dispatch(
						startEditFlowDocumentLoading(
							folderId,
							files,
							fileIdLoaded,
							true, //values?.version === VERSION_TYPE_MAJOR ? true : false,
							values?.versioningComments,
							{ id: documentId, aspectList: newAspectList },
							tagsField,
							
						)
					);
				case EDIT_MODE:
					const callBack = () => {
						history.goBack();
						dispatch(saveFormFinish());
					}
					return dispatch(

						startEditDocumentLoading(

							folderId,
							files,
							fileIdLoaded,
							true, //values?.version === VERSION_TYPE_MAJOR ? true : false,
							values?.versioningComments,
							{ id: documentId, aspectList: newAspectList },
							tagsField,
							callBack
						)
					);

				default:
					break;
			}

		}

	}
	

	const flowStepsProvider = useFlowSteps({ editMode: EDIT_MODE, controlledDocument, setFiles, document, files, handleClear, disabledSubmit, handleSaveForm, handleSubmit, flowId, nextStep })
	const { flowSteps,
		Component,
		activeStep,
		setActiveStep,
		setOtherProps } = flowStepsProvider

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

	return (<FormProvider {...{ resolver, setResolver }} {...methods} >
		<FlowContext.Provider value={{ ...flowStepsProvider }}>
			<Grid container spacing={2}>
				<Grid item md={12} xs={12} sm={12}>
					<Paper className={classes.container}>
						{
							(controlledDocument || activeStep > 0 || flowId) && <>
								<Stepper alternativeLabel activeStep={activeStep}>
									{
										Object.keys(flowSteps).map((name, index) => <Step key={index}>
											<StepLabel>{name}</StepLabel>
										</Step>)
									}
								</Stepper>
								<Divider className={classes.margin} />
							</>
						}

						{Component}
					</Paper>
				</Grid>
			</Grid>
		</FlowContext.Provider>
	</FormProvider>
	)
}

export default Documents;
