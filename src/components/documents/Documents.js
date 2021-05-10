import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Divider, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import get from 'lodash/get'
import moment from 'moment';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

import { documentsClear, startDocumentByIdLoading, startEditDocumentLoading, startSaveFormLoading, startThumbnailLoading } from 'actions/documents';
import { TitleCard } from 'components/ui/helpers/TitleCard';
import { DATE, FORMAT_YYYY_MM_DD, VERSION_TYPE_MAJOR } from 'constants/constUtil';
import IntlMessages from 'util/IntlMessages';

import { DocumentContext } from './helpers/DocumentContext';
import { DetailDocumentType } from './ui/DetailDocumentType';
import { DropZoneDocument } from './ui/DropZoneDocument';
import { FormInit } from './ui/FormInit';
import { SelectFolder } from './ui/SelectFolder';
import { SelectTags } from './ui/SelectTags';
import { Versioning } from './ui/Versioning';

const useStyles = makeStyles((theme) => ({
	buttons: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const Documents = () => {

	const classes = useStyles();

	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
	const methods = useForm({
		mode: 'onTouched',
		name: 'documentForm',
		defaultValues: {
			tagsField: []
		},
		// resolver: yupResolver(schema),
	});
	const { handleSubmit, register, control, formState: { errors } } = methods

	const {
		detailDocumentType = [],
		fileIdLoaded = '',
		folderId = '',
		versioningType = '',
		versioningComments = '',
		tagsSelected = [],
	} = useSelector(state => state.documents);
	const documentsList = useSelector(state => state.documents.filesLoaded)

	const { id: documentId = '', aspectList = [] } = detailDocumentType;

	// ID DOCUMENTO URL
	const { document = '' } = queryString.parse(location.search);

	const [files, setFiles] = useState(null);
	const handleClear = () => {
		dispatch(documentsClear());
	}

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

		// const { tags , ...aspectList} = values
		// const filesId = documentsList.map(({ fileIdLoaded }) => fileIdLoaded)
		// dispatch(
		// 	startSaveFormLoading(
		// 		filesId,
		// 		folderId,
		// 		{ id: documentId, aspectList},
		// 		tags
		// 	)
		// );
		// const resp = await Swal.fire({
		// 	title: 'Carga de documento',
		// 	text: "¿Estás seguro de realizar la carga de archivos?",
		// 	icon: "question",
		// 	showCancelButton: true,
		// 	focusConfirm: true,
		// 	heightAuto: false,
		// });
		// const newAspectList = aspectList
		for (const aspect of aspectList) {
			aspect.customPropertyList = aspect.customPropertyList.filter( property => {
				const value = get(values, property?.name, null)
				if (value){
					property.value = value
					return property
				}
			})
		}

		const { tags } = values
		const filesId = documentsList.map(({ fileIdLoaded }) => fileIdLoaded)
		dispatch(
			startSaveFormLoading(
				filesId,
				folderId,
				{ id: documentId, aspectList},
				tags
			)
		);
			
			// let filters = [];

			// FILTROS DE LOS CAMPOS QUE TIENEN VALOR
			// for (const aspect of aspectList) {

			// 	const existsWithValue = aspect.customPropertyList
			// 		.filter(property => {

			// 			if (property.value) {

			// 				if (property.type === DATE) {

			// 					property.value = moment(property.value).format(FORMAT_YYYY_MM_DD);

			// 				}

			// 				return property;
			// 			}

			// 		});

			// 	if (existsWithValue.length > 0) {

			// 		filters = [
			// 			...filters,
			// 			{
			// 				...aspect,
			// 				customPropertyList: existsWithValue,
			// 			}
			// 		];
			// 	}

			// }

			// // TODO: se filtran por el nombre del tag. Requiere ajuste back
			// const tags = tagsSelected.map(({ tag }) => {

			// 	return tag

			// });

			

			// if (document.length === 0) {
			// 	const filesId = documentsList.map( ({fileIdLoaded}) => fileIdLoaded)
			// 	dispatch(
			// 		startSaveFormLoading(
			// 			filesId,
			// 			folderId,
			// 			{ id: documentId, aspectList: filters },
			// 			tags
			// 		)
			// 	);

			// } else {

			// 	dispatch(
			// 		startEditDocumentLoading(
			// 			files,
			// 			fileIdLoaded,
			// 			versioningType === VERSION_TYPE_MAJOR ? true : false,
			// 			versioningComments,
			// 			{ id: documentId, aspectList: filters },
			// 			tags
			// 		)
			// 	);
			// 	setTimeout(() => {

			// 		history.goBack();

			// 	}, 1000);

			// }

	}

	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">
					<FormProvider {...methods} >
						<form onSubmit={handleSubmit(handleSaveForm)}>
							<div className="row">
								<div className="col-xl-12 col-lg-12 col-md-12 col-12">
									<TitleCard message="document.loadDocuments" />
								</div>
							</div>

							{
								document.length === 0
								&&
								<FormInit />
							}

							{
								document.length > 0
								&&
								<div className="row">
									<div className="col-xl-4 col-lg-12 col-md-12 col-12 mt-3">
										<SelectFolder />
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
								document.length > 0
								&&
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
