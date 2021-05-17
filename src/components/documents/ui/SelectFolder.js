import { TextField } from 'components/ui/Form';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import { SelectFolderDialog } from './SelectFolderDialog';

const lblText = <IntlMessages id="document.loadDocuments.folders" />

export const SelectFolder = () => {
	const { register, setValue, formState: { errors } } = useFormContext();
	const { folderName = '' } = useSelector(state => state.documents);

	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		if (folderName) {
			setValue('folderName', folderName)
		}
	}, [folderName])

	return (<>
		<TextField
			style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}
			onClick={() => setOpenModal(!openModal)}
			label={lblText}
			variant="outlined"
			color="primary"
			fullWidth
			required
			value={folderName}
			name="folderName"
			size="small"
			shrink={true}
			errors={errors}
			register={register}
		/>
		<SelectFolderDialog
			setOpenModal={setOpenModal}
			openModal={openModal}
		/>
	</>
	)
}
