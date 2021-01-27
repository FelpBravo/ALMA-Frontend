import React from 'react';
import { NativeSelect } from '@material-ui/core';
import { BootstrapInput } from 'components/ui/helpers/BootstrapInput';
import { useDispatch, useSelector } from 'react-redux';

import { SelectFolderDialog } from './SelectFolderDialog';
import { openModalSelectFolder } from 'actions/documents';

export const SelectFolder = () => {

	const dispatch = useDispatch();

	const { folderName = '' } = useSelector(state => state.documents);

	const handleOpenModal = () => {

		dispatch(openModalSelectFolder());

	}

	return (
		<>
			<NativeSelect
				onClick={handleOpenModal}
				name="folder"
				value={folderName}
				input={<BootstrapInput />}
			>
				<option aria-label="None" value="">--SELECCIONE--</option>
				{
					folderName.length > 0 && <option value={folderName}>{folderName}</option>
				}
			</NativeSelect>

			<SelectFolderDialog />
		</>
	)
}
