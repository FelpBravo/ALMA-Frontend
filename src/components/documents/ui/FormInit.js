import React, { useEffect } from 'react';
import { FormControl, NativeSelect, InputLabel } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { BootstrapInput } from 'components/ui/helpers/BootstrapInput';
import IntlMessages from 'util/IntlMessages';
import {
	startDocumentsTypeLoading,
	startDetailDocumentTypeLoading,
	removeDetailDocumentType,
} from 'actions/documents';
import { SelectFolder } from './SelectFolder';

export const FormInit = () => {

	const dispatch = useDispatch();

	const {
		documentsType = [],
		detailDocumentType = {},
	} = useSelector(state => state.documents);

	const { id: documentType = '' } = detailDocumentType;

	const { authUser } = useSelector(state => state.auth);

	useEffect(() => {

		dispatch(startDocumentsTypeLoading(authUser));

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
			<div className="col-xl-4 col-lg-4 col-md-4 col-4">
				<FormControl fullWidth>
					<InputLabel>
						<IntlMessages id="document.loadDocuments.typeDoc" />
					</InputLabel>
					<NativeSelect
						value={documentType}
						name="documentsType"
						input={<BootstrapInput />}
						onChange={handleOnChange}
					>
						<option aria-label="None" value="">--SELECCIONE--</option>
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
						}
					</NativeSelect>
				</FormControl>
			</div>

			<div className="col-xl-4 col-lg-4 col-md-4 col-4">
				<FormControl fullWidth>
					<InputLabel>
						<IntlMessages id="document.loadDocuments.folders" />
					</InputLabel>

					<SelectFolder />
				</FormControl>
			</div>
		</div>
	)
}
