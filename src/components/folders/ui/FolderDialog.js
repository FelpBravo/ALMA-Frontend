import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalFolder, startEditFolderLoading, startCreateFolderLoading, startFoldersTypesLoading, startUpdateFolderLoading } from 'actions/adminFolders';
import { ACTION_CREATE } from 'constants/constUtil';
import IntlMessages from 'util/IntlMessages';
import { FormControl, FormControlLabel, MenuItem, Radio, RadioGroup } from '@material-ui/core';
import { identity } from 'lodash-es';

const fieldName = <IntlMessages id="folders.modal.field.name" />
const fieldPosition = <IntlMessages id="folders.modal.field.position" />

const FolderDialog = () => {

	const dispatch = useDispatch();

	const { authUser } = useSelector(state => state.auth);

	const { openModal, folder, actionModal, currentFolders, typeFolders = [] } = useSelector(state => state.adminFolders);

	const { id } = currentFolders

	const [formValues, setFormValues] = useState({});

	const { name, type, state, parentId, parentName } = formValues;

	const [messageErrorTypes, setMessageErrorTypes] = useState(null);

	const [messageErrorName, setMessageErrorName] = useState(null)

	useEffect(() => {
		setFormValues({ ...folder });
		dispatch(startFoldersTypesLoading(authUser,id))
		
	}, [folder, setFormValues]);

	useEffect(() => {
		
		if (!name || name.length < 3) {

			setMessageErrorName('Este campo debe tener mínimo 3 letras');

		} else {

			setMessageErrorName(null);

		}

	}, [name, setMessageErrorName])

	useEffect(() => {

		if (!type) {

			setMessageErrorTypes('Este debe seleccionar un tipo de carpeta');

		} else {

			setMessageErrorTypes(null);

		}

	}, [type, setMessageErrorTypes])

	const handleClose = () => {

		dispatch(closeModalFolder());

	}

	const handleOnChange = ({ target }) => {
		const { name, value } = target;

		setFormValues({
			...formValues,
			[name]: value
		});

	}

	const handleOnSave = () => {
		const data = {
			...formValues,
			type: type,
			position:1,
			state: String(formValues.state) === 'true',
			company: 1
		};
		if (actionModal === ACTION_CREATE) {
			dispatch(startUpdateFolderLoading(authUser,data,id,parentId))
			dispatch(closeModalFolder());
			

		} else {
			dispatch(startEditFolderLoading(authUser, data, parentId, parentName));
			dispatch(closeModalFolder());

		}

	}

	return (
		<div>
			<Dialog
				open={openModal}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth={true}
			>
				<DialogTitle>
					{
						actionModal === ACTION_CREATE
							? <IntlMessages id="folders.modal.title.create" style={{fontSize:16, fontFamily: "Poppins"}}/>
							: <IntlMessages id="folders.modal.title.edit" />
					}
				</DialogTitle>

				<DialogContent>
				{actionModal === ACTION_CREATE &&
							<TextField
								select
								label="Tipo de espacio de trabajo"
								variant="outlined"
								fullWidth
								size="small"
								name="type"
								onChange={handleOnChange}
							>
							{typeFolders && typeFolders.map((data)=>{
								return <MenuItem value={data} selected={true}>{data.name}</MenuItem>
							})	
							}
							</TextField>
				}
					

					<div className="col-xl-12 col-lg-12 col-md-12 col-12">
						<span className="text-danger text-error">{messageErrorTypes}</span>
					</div>

				

					<div className="mt-2">
	
							<TextField
								name="name"
								value={name}
								autoFocus
								label={fieldName}
								type="text"
								variant="outlined"
								size="small"
								fullWidth
								onChange={handleOnChange}
							/>

						<div className="col-xl-12 col-lg-12 col-md-12 col-12">
							<span className="text-danger text-error">{messageErrorName}</span>
						</div>
					</div>
					
				</DialogContent>

				<DialogActions style={{ margin:20 }}>
					<Button
						onClick={handleClose}
						variant="contained"
						color="primary">
						<IntlMessages id="button.text.cancel" />
					</Button>

					<Button
						disabled={(!name || name.length < 3) || type <= 0}
						onClick={handleOnSave}
						variant="contained"
						color="primary"
					>
						<IntlMessages id="button.text.save" />
					</Button>
				</DialogActions>

			</Dialog>
		</div>
	);
}

export default FolderDialog;
