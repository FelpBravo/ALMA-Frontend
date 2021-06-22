import { FormControl, Grid, MenuItem } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { removeDetailDocumentType, startDetailDocumentTypeLoading, startDocumentsTypeLoading, startFoldersLoading } from 'actions/documents';
import { CheckField, SelectField } from 'components/ui/Form';

import { SelectFolder } from './SelectFolder';

export const FormInit = () => {
	const { watch, setValue, formState: { errors }, control } = useFormContext();
	const documentsTypeField = watch('documentsType', null);
	const controlledDocument = watch('controlled_document', false);
	const documentsList = useSelector(state => state.documents.filesLoaded)

	const dispatch = useDispatch();

	const {
		documentsType = [],
		detailDocumentType = {},
		folders = [],
	} = useSelector(state => state.documents);

	const { id: documentType = '' } = detailDocumentType;

	const { authUser } = useSelector(state => state.auth);

	useEffect(() => {
		if (controlledDocument && documentsList.length > 1) {
			Swal.fire({
				title: 'Oops...',
				html: 'Solo puedes seleccionar 1 archivo para documento controlado.',
				icon: 'error',
			});
			setValue('controlled_document', false)
		}
	}, [controlledDocument])

	useEffect(() => {

		dispatch(startDocumentsTypeLoading(authUser));

		dispatch(startFoldersLoading(authUser));

	}, [dispatch, authUser]);

	useEffect(() => {
		if (documentsTypeField) {
			dispatch(startDetailDocumentTypeLoading(documentsTypeField));
		}
		return () => {
			dispatch(removeDetailDocumentType());
		}
	}, [documentsTypeField])

	const commonProps = {
		errors,
		control
	}

	const isControlledDocument = {
		name: 'controlled_document',
		label: 'Documento controlado',
		control,
	};

	return (<>
		<Grid container spacing={2}>

			{
				(
					documentsType.length === 0
					||
					folders.length === 0
				)
				&&
				<Grid item lg={4} md={4} sm={4} xs={4}>
					<Skeleton variant="circle" width={40} height={40} />
					<Skeleton
						variant="text"
						height={40}
						style={{ width: '100%' }} />
				</Grid>
			}

			{
				documentsType.length > 0
				&&
				folders.length > 0
				&&
				<>
					<Grid item lg={4} md={4} sm={12} xs={12}>

						<SelectFolder />

					</Grid>

					<Grid item lg={4} md={6} sm={12} xs={12}>

						<FormControl fullWidth>
							<SelectField
								label="Seleccionar tipo de documento"
								name="documentsType"
								size="small"
								{...commonProps}
							>
								{
									documentsType.length > 0
									&&
									documentsType.map(({ id, name }) =>
										<MenuItem key={id} value={id}>{name}</MenuItem>)
								}
							</SelectField>
						</FormControl>
					</Grid>
				</>
			}
		</Grid>
		<Grid container style={{ marginTop: 10 }}>
			<Grid item xl={4} lg={4} md={4} sm={12}>
				<CheckField {...isControlledDocument} />
			</Grid>
		</Grid>
	</>
	)
}
