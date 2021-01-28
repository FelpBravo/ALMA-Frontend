import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { SelectFolderDialog } from './SelectFolderDialog';
import IntlMessages from 'util/IntlMessages';

const lblText = <IntlMessages id="document.loadDocuments.folders" />

export const SelectFolder = () => {

	const { folderName = '' } = useSelector(state => state.documents);

	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<TextField
				className="modal-select-folder"
				onClick={() => setOpenModal(!openModal)}
				label={lblText}
				variant="outlined"
				color="primary"
				value={folderName}
				fullWidth
				size="small"
			/>

			<SelectFolderDialog
				setOpenModal={setOpenModal}
				openModal={openModal}
			/>
		</>
	)
}
