import React, { Text, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { TextField } from 'components/ui/Form'
import IntlMessages from 'util/IntlMessages';

import { SelectFolderDialog } from './SelectFolderDialog';

const lblText = <IntlMessages id="document.loadDocuments.folders" />

export const SelectFolder = () => {
	const { register, control, formState: { errors } } = useFormContext();

	const { folderName = '' } = useSelector(state => state.documents);

	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			
			<TextField
			    style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}
				// className="modal-select-folder"
				onClick={() => setOpenModal(!openModal)}
				label={lblText}
				variant="outlined"
				color="primary"
				value={folderName}
				fullWidth
				name="folderName"
				size="small"
				shrink="true"
				register={register}
			/>


			<SelectFolderDialog
				setOpenModal={setOpenModal}
				openModal={openModal}
			/>
		</>
	)
}
