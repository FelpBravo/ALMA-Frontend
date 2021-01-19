import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Button, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

import { TitleCard } from 'components/ui/helpers/TitleCard';
import { FormInit } from './ui/FormInit';
import IntlMessages from 'util/IntlMessages';
import { DetailDocumentType } from './ui/DetailDocumentType';
import { DropZoneDocument } from './ui/DropZoneDocument';
import {
	documentsClear, startDocumentByIdLoading,
	startSaveFormLoading, startTagsLoading, startThumbnailLoading
} from 'actions/documents';
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

	const { detailDocumentType = [],
		fileIdLoaded = '',
		folderId = '',
		versioningType = '',
		versioningComments = ''
	} = useSelector(state => state.documents);

	const { id: documentId = '', aspectList = [] } = detailDocumentType;

	const { document = '' } = queryString.parse(location.search);

	useEffect(() => {

		if (document.length === 0) {
			return;
		}

		dispatch(documentsClear());
		dispatch(startDocumentByIdLoading(document));
		dispatch(startThumbnailLoading(document));
		dispatch(startTagsLoading());

	}, [dispatch, document]);

	const handleSaveForm = async () => {
		const resp = await Swal.fire({
			title: 'Load form',
			text: "¿Está seguro de continuar?",
			icon: "question",
			showCancelButton: true,
			focusConfirm: true,
			heightAuto: false,
		});

		if (resp.value) {

			let filters = [];

			// FILTROS DE LOS CAMPOS QUE TIENEN VALOR
			for (const aspect of aspectList) {
				const existsWithValue = aspect.customPropertyList.filter(property => property.value);
				if (existsWithValue.length > 0) {
					filters = [...filters, {
						...aspect,
						customPropertyList: existsWithValue,
					}];
				}
			}

			if (document.length === 0) {
				dispatch(startSaveFormLoading(fileIdLoaded, folderId, { id: documentId, aspectList: filters }));
			} else {

			}
		}

	}

	const handleClear = () => {
		dispatch(documentsClear());
	}

	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">

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

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">
							<Divider />
						</div>
					</div>

					<DropZoneDocument />

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
										type="button"
										variant="contained"
										onClick={handleClear}
									>
										<IntlMessages id="dashboard.advancedSearchClear" />
									</Button>

									<Button
										disabled={
											detailDocumentType.length === 0 ||
											documentId.length === 0 ||
											aspectList.length === 0 ||
											fileIdLoaded.length === 0 ||
											folderId.length === 0 ||
											(document.length > 0
												&&
												(
													versioningType.length === 0 ||
													versioningComments.length === 0
												)
											)
										}
										type="submit"
										variant="contained"
										color="primary"
										onClick={handleSaveForm}
									>
										<IntlMessages id="document.loadDocuments.load" />
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

export default Documents;
