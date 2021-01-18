import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TitleCard } from 'components/ui/helpers/TitleCard';
import { FormInit } from './ui/FormInit';
import { DetailDocumentType } from './ui/DetailDocumentType';
import { DropZoneDocument } from './ui/DropZoneDocument';
import { Divider, Button, Grid } from '@material-ui/core';
import IntlMessages from 'util/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';
import { documentsClear, startSaveFormLoading } from 'actions/documents';
import Swal from 'sweetalert2';

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

	const { detailDocumentType = [], fileIdLoaded = '', folderId = '' } = useSelector(state => state.documents);
	const { id: documentId = '', aspectList = [] } = detailDocumentType;


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

			dispatch(startSaveFormLoading(fileIdLoaded, folderId, { id: documentId, aspectList: filters }));
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

					<FormInit />

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
											folderId.length === 0
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
