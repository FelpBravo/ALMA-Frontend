import React, { useEffect, useState } from 'react'
import { FormControl, NativeSelect, InputLabel } from '@material-ui/core'
import { BootstrapInput } from 'components/ui/helpers/BootstrapInput'
import { useDispatch, useSelector } from 'react-redux'
import IntlMessages from 'util/IntlMessages'
import {
	startDocumentsTypeLoading,
	startDetailDocumentTypeLoading,
	removeDetailDocumentType
} from 'actions/documents'

export const FormInit = () => {

	const dispatch = useDispatch();

	const {
		documentsType = [],
		detailDocumentType = {}
	} = useSelector(state => state.documents);

	const { id = '' } = detailDocumentType;

	const { initFolders = [] } = useSelector(state => state.folders);

	const [documentType, setDocumentType] = useState(id);


	useEffect(() => {

		dispatch(startDocumentsTypeLoading());

	}, []);

	const handleOnChange = ({ target }) => {
		const { name, value } = target;

		switch (name) {
			case 'documentsType':
				if (value) {
					dispatch(startDetailDocumentTypeLoading(value));
					setDocumentType(value)
				} else {
					dispatch(removeDetailDocumentType());
					setDocumentType('')
				}
				break;

			case 'folder':
				console.log(value);

			default:
				break;
		}
	}

	return (
		<div className="row">
			<div className="col-xl-4 col-lg-4 col-md-4 col-4">
				<FormControl fullWidth>
					<InputLabel>
						<IntlMessages id="dashboard.loadDocuments.typeDoc" />
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
						<IntlMessages id="dashboard.loadDocuments.folders" />
					</InputLabel>
					<NativeSelect
						name="folder"
						input={<BootstrapInput />}
						onChange={handleOnChange}
					>
						<option aria-label="None" value="">--SELECCIONE--</option>
						{
							initFolders.length > 0
							&&
							initFolders.map(({ id, name }) => {
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
		</div>
	)
}
