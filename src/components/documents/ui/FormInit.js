import { FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeDetailDocumentType, startDetailDocumentTypeLoading, startDocumentsTypeLoading, startFoldersLoading } from 'actions/documents';
import { AutoCompleteField, CheckField, SelectField, TextField } from 'components/ui/Form';
import { BootstrapInput } from 'components/ui/helpers/BootstrapInput';
import IntlMessages from 'util/IntlMessages';

import { SelectFolder } from './SelectFolder';

export const FormInit = () => {

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

	const handleOnChange = ({ target }) => {
		const { name, value } = target;

		switch (name) {
			case 'documentsType':
				if (value) {
					dispatch(startDetailDocumentTypeLoading(value));
				} else {
					dispatch(removeDetailDocumentType());
				}

				break;

			default:
				break;
		}

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
								// style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, marginTop: '0px' }}
								// value={documentType}
								label="Seleccionar tipo de documento"
								name="documentsType"
								size="small"
							// input={<BootstrapInput />}
							// onChange={handleOnChange}
							>
								{
									documentsType.length > 0
									&&
									documentsType.map(({ id, name }) =>
										<MenuItem key={id} value={id}>{name}</MenuItem>)
								}
								{/* <option aria-label="None" value=""></option>
								{
									
									documentsType.length > 0
									&&
									documentsType.map(({ id, name }) => {
										
										return <option
											value={id}
											key={id}
										>
											{name}
										</option>
									})
								} */}
							</SelectField>
						</FormControl>


					</div>


				</>
			}
		</div>
	)
}
