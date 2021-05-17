import { FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { removeDetailDocumentType, startDetailDocumentTypeLoading, startDocumentsTypeLoading, startFoldersLoading } from 'actions/documents';
import { AutoCompleteField, CheckField, SelectField, TextField } from 'components/ui/Form';
import { BootstrapInput } from 'components/ui/helpers/BootstrapInput';
import IntlMessages from 'util/IntlMessages';

import { SelectFolder } from './SelectFolder';

export const FormInit = () => {
	const { watch, formState: { errors }, control } = useFormContext();
	const documentsTypeField = watch('documentsType', null);

	const dispatch = useDispatch();

	const {
		documentsType = [],
		detailDocumentType = {},
		folders = [],
	} = useSelector(state => state.documents);

	const { id: documentType = '' } = detailDocumentType;

	const { authUser } = useSelector(state => state.auth);

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

	return (
		<div className="row">

			{
				(
					documentsType.length === 0
					||
					folders.length === 0
				)
				&&
				<div className="col-xl-4 col-lg-4 col-md-4 col-4">
					<Skeleton variant="circle" width={40} height={40} />
					<Skeleton
						variant="text"
						height={40}
						style={{ width: '100%' }} />
				</div>
			}

			{
				documentsType.length > 0
				&&
				folders.length > 0
				&&
				<>
					<div className="col-xl-4 col-lg-4 col-md-4 col-4">

						<SelectFolder />

					</div>

					<div className="col-xl-4 col-lg-4 col-md-4 col-4">

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
					</div>
				</>
			}
		</div>
	)
}
